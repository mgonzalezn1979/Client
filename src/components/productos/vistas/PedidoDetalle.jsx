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

  const { listadoPedidos, setListadoPedidos} = useContext(Context);
  const {
    actualizaResumen,
    limpiarCarrito,
    setMensajeria,
    setPedido,
    setFlagCreaPedido,
  } = useContext(Context);


  const [visible, setVisible] = useState(true);
 
  console.log("pedido detalle " + detalle);

  const handleStatus = () => {
    setMensajeria("");
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleEliminarPedido = () => {
    console.log("ELMINAR PEDIDO ID:" + ID_Pedido);
    setMensajeria("ELIMINANDO PEDIDO "+ID_Pedido);
    axios
      .delete("http://localhost:3000/api/pedidos/eliminar/" + ID_Pedido)
      .then((data) => {
        console.log("eliminado?");
        console.log(data);
        navigate("/misPedidos");
        //QUITAR DE LISTADO
        var filtrado = listadoPedidos.filter(item=>item.ID!=ID_Pedido);
        setListadoPedidos(filtrado);
        setMensajeria("Pedido "+ID_Pedido+" eliminado correctamente");
        listadoPedidos;
      })
      .catch((error) => {
        console.log("error al eliminar pedido id " + ID_Pedido);
        setMensajeria("Error al eliminar pedido ID:"+ID_Pedido);
      });

    //llamar a axios para eliminar pedido
  };

  const handleModificarPedido = () => {
    setMensajeria("Modificando pedido ID:"+ID_Pedido);
    limpiarCarrito();

    let pedidoModificado = new Pedido();
    pedidoModificado.ID = ID_Pedido;
    pedidoModificado.total = detalle.TOTAL;
    pedidoModificado.cantidadProductos = 0;
    pedidoModificado.fecha = detalle.FECHA;

    detalle.items.forEach((item) => {
      const cantidad = item.cantidad;
      const ID_PRODUCTO = item.ID;
      const nombre = item.nombre;
      const precio = item.precio;
      const subtotal = item.subtotal;
      const urlFoto = item.urlFoto;
      pedidoModificado.cantidadProductos += cantidad;
      pedidoModificado.total = +subtotal;

      console.log(item);
      let itemPed = new ItemPedido();
      itemPed.cantidad = cantidad;
      itemPed.nombre = nombre;
      itemPed.total = subtotal;
      itemPed.ID = ID_PRODUCTO;
      itemPed.precio = precio;
      itemPed.urlFoto = urlFoto;
      pedidoModificado.items.push(itemPed);
    });

    setFlagCreaPedido(false);
    setPedido(pedidoModificado);
    actualizaResumen();
    navigate("/verPedido");
  };

  return (
    <>
      <div class="container fluid">
        <div class="row listado">
          <div clas="col-lg-1"></div>
          <div class="col-lg-11 center">
            <table id="tabla_detalle">
              <tr>
                <th class="fuenteEstandar">ID Pedido</th>
                <th class="fuenteEstandar">Fecha</th>
                <th class="fuenteEstandar">Total</th>
                <th></th>
              </tr>
              <tr>
                <td class="listado2">
                  <p class="texto_descripcion">{detalle.ID}</p>
                </td>
                <td class="listado2">
                  <p class="texto_descripcion">
                    {new Date(detalle.FECHA).toLocaleDateString("en-US")}
                  </p>
                </td>
                <td class="listado2">
                  <p class="texto_descripcion">{detalle.TOTAL} Є</p>
                </td>
                <td>
                  <div class="col-lg-1 middle" hidden={visible}>
                    <button class="boton_estandar" onClick={handleStatus}>
                      Ocultar
                    </button>
                  </div>

                  <div class="col-lg-1 middle" hidden={!visible}>
                    <button class="boton_estandar" onClick={handleStatus}>
                      Ver
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row listado2 " hidden={visible}>
          <div class="col-lg-1"></div>
          <div class="col-lg-2 ">
            <button class="boton_estandar" onClick={handleEliminarPedido}>
              Eliminar
            </button>
            <button class="boton_estandar" onClick={handleModificarPedido}>
              Modificar
            </button>
          </div>
          <div class="col-lg-1"></div>
           
            <div KEY={detalle.ID + "detalle"} class="col-lg-8">
              {detalle.items.map((item) => {
                return (
                  <div>
                    <p class="fuenteGrande">{(Math.round(item.subtotal * 100) / 100).toFixed(2)} €</p>
                    <p class="fuenteEstandar">&nbsp;&nbsp;&nbsp;{item.cantidad}x{item.nombre}</p>
                                      </div>
                );
              })}
            </div>
           
        </div>
      </div>
      <br />
    </>
  );
}
export default PedidoDetalle;
