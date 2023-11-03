/** funcionalidad principal PedidoDetalle
 * permite
 * - ver el detalle de un pedido ya realizado
 * - modificar el pedido
 * - eliminar el pedido *
 * / */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pedido } from "../../../class/Pedido";
import { ItemPedido } from "../../../class/ItemPedido";
import { Context } from "../../contexto/Context";
import { useContext } from "react";

/** recibe como parametro el objeto detalle del pedido y su ID */
function PedidoDetalle({ detalle, ID_Pedido }) {
  const navigate = useNavigate();

  /** elementos del contexto necesarios para operar  */
  const {
    URL_PATH_API,
    actualizaResumen,
    limpiarCarrito,
    setMensajeria,
    setPedido,
    setFlagCreaPedido,
    listadoPedidos,
    setListadoPedidos,
  } = useContext(Context);

  /** uso local para ocultar o mostrar contenido */
  const [visible, setVisible] = useState(true);

  /**  setea flag ocultar/ver detalle del pedido*/
  const handleStatus = () => {
    setMensajeria("");
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  /** Permite eliminar un pedido
   * invoka la api de pedidos con el id correspondiente
   * respuesta se muestra en mensajeria popup
   */
  const handleEliminarPedido = () => {
    axios
      .delete(URL_PATH_API + "/api/pedidos/eliminar/" + ID_Pedido)
      .then((data) => {
        console.log("eliminado?");
        console.log(data);
        navigate("/misPedidos");
        //quita pedido de listado
        var filtrado = listadoPedidos.filter((item) => item.ID != ID_Pedido);
        setListadoPedidos(filtrado);
        setMensajeria("Pedido " + ID_Pedido + " eliminado correctamente");
      })
      .catch((error) => {
        console.log("error " + error);
        setMensajeria("Error al eliminar pedido ID:" + ID_Pedido);
      });
  };

  /** Permite preprar aplicacion para modificar el pedido
   * seteando las variables correspondientes para "cargar"
   * el pedido en canasta */
  const handleModificarPedido = () => {
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
      <div class="container">
        <div class="row listado">
          <div class="col-xl-3 center">
           <p class="fuenteTituloDetallePedido">ID PEDIDO:</p> <p class="listado2 texto_descripcion">{detalle.ID}</p>
          </div>

          <div class="col-xl-3 center">
          <p class="fuenteTituloDetallePedido">FECHA:</p> 
            {" "}
            <p class="texto_descripcion listado2">
              {new Date(detalle.FECHA).toLocaleDateString("en-US")}
            </p>
          </div>

          <div class="col-xl-3 center"><p class="fuenteTituloDetallePedido"> TOTAL:</p>
           <p class="texto_descripcion listado2">{detalle.TOTAL} Є</p>
          </div>

          <div class="col-xl-3 middle center" hidden={visible}>
            <button class="boton_estandar" onClick={handleStatus}>
              Ocultar
            </button>
          </div>

          <div class="col-xl-3 middle center" hidden={!visible}>
            <button class="boton_estandar" onClick={handleStatus}>
              Ver
            </button>
          </div>
        </div>


        <div class="row listado2" hidden={visible}>
           
        <div class="col-xl-3 col-lg-5 col-md-12 col-sm-12 col-xs-12 ">
            <button class="boton_estandar" onClick={handleEliminarPedido}>
              Eliminar
            </button>
            <button class="boton_estandar" onClick={handleModificarPedido}>
              Modificar
            </button>
          </div>
           

          <div KEY={detalle.ID + "detalle"} 
           class="col-xl-9 col-lg-5 col-md-12 col-sm-12 col-xs-12 "
          >
            {detalle.items.map((item) => {
              return (
                <div>
                  <p class="fuenteGrande">
                    {(Math.round(item.subtotal * 100) / 100).toFixed(2)} €
                  </p>
                  <p class="fuenteEstandar">
                    &nbsp;&nbsp;&nbsp;{item.cantidad}x{item.nombre}
                  </p>
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
