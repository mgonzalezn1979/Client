import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pedido } from "../../../class/Pedido";
import { ItemPedido } from "../../../class/ItemPedido";
import { Context } from "../../contexto/Context";
import { useContext } from "react";

function PedidoDetalle({ detalle, ID_Pedido }) {
  const navigate = useNavigate();
  const {
    actualizaResumen,
    limpiarCarrito,
    pedido,
    sesion,
    setPedido,
    setFlagCreaPedido,
  } = useContext(Context);

  const [visible, setVisible] = useState(true);

  
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };


  //   const [idPedido, setIdPedido] = useState(0);
  console.log("pedido detalle " + detalle);
  //   setIdPedido(ID_Pedido);
  // function handleStatus()
  const handleStatus = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleEliminarPedido = () => {
    console.log("ELMINAR PEDIDO ID:" + ID_Pedido);
    axios
      .delete("http://localhost:3000/api/pedidos/eliminar/" + ID_Pedido)
      .then((data) => {
        console.log("eliminado?");
        console.log(data);
        navigate("/misPedidos");
        //QUITAR DE LISTADO
      })
      .catch((error) => {
        console.log("error al eliminar pedido id " + ID_Pedido);
      });

    //llamar a axios para eliminar pedido
  };

  const handleModificarPedido = () => {
    //hacer una wea marciana donde se cargue un pedido como si fuera nuevo
    limpiarCarrito();
 
     
    let pedidoModificado = new Pedido();
    pedidoModificado.ID = ID_Pedido;
    pedidoModificado.total = detalle.TOTAL;
    pedidoModificado.cantidadProductos = 0;
    pedidoModificado.fecha = detalle.FECHA;
    pedidoModificado.WEA="";
    detalle.items.forEach((item) => {
      const cantidad = item.cantidad;
      const ID_PRODUCTO = item.ID;
      const nombre = item.nombre;
      const precio = item.precio;
      const subtotal = item.subtotal;
      pedidoModificado.cantidadProductos += cantidad;
      pedidoModificado.total = +subtotal;

      console.log(item);
      let itemPed = new ItemPedido();
      itemPed.cantidad=cantidad;
      itemPed.nombre=nombre;
      itemPed.total=subtotal;
      itemPed.ID=ID_PRODUCTO;
      itemPed.precio=precio;
      pedidoModificado.items.push(itemPed);       
    
    });

    setFlagCreaPedido(false);
    setPedido(pedidoModificado);
    actualizaResumen();
    navigate("/verPedido");
  };

  return (
    <>
      <p>
        ID Pedido:{detalle.ID} fecha:{(new Date(detalle.FECHA)).toLocaleDateString('es-ES', options)} total:{detalle.TOTAL}
      </p>
      {!visible ? <button onClick={handleStatus}>Ocultar</button> : <p></p>}
      {visible ? (
        <button onClick={handleStatus}>Ver</button>
      ) : (
        <p>
          <button onClick={handleEliminarPedido}>Eliminar</button>
          <button onClick={handleModificarPedido}>Modificar</button>
          <div KEY={detalle.ID + "detalle"}>
            {detalle.items.map((item) => {
              return (
                <div>
                  <p>
                    cantidad:{item.cantidad} Producto:{item.nombre} Subtotal:
                    {item.subtotal}
                  </p>
                </div>
              );
            })}
          </div>
        </p>
      )}

      <br />
    </>
  );
}
export default PedidoDetalle;
