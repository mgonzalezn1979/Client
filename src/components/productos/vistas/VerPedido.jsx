/** Funcionalidad principal VerPedido:
 *  Permite ver los productos que se han seleccionado desde
 * la pagina principal /home o canasta
 * en estos productos se puede agregar, quitar o eliminar elementos del pedido
 * Puede confirmar o anular la canasta o pedido que muestra este componente
 * / */
import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/** importa el contexto de uso global */
import { Context } from "../../contexto/Context";
/** Utiliza clase Pedido para operar */
import { Pedido } from "../../../class/Pedido";
/** Componentes necesarios para el depliegue de productos, encabezado,
 * pie de pagina y mensajeria popup */
import ItemProducto from "./ItemProducto";
import Header from "../../Header";
import Footer from "./Footer";
import Popup from "../../mensajeria/Popup";

function VerPedido() {
  /** elementos del contexto  */
  const {
    URL_PATH_API,
    mensajeria,
    setMensajeria,
    pedido,
    sesion,
    setPedidoPorConfirmar,
    setPedido,
    setFlagCreaPedido,
    flagCreaPedido,
  } = useContext(Context);
  const navigate = useNavigate();

  if (pedido.cantidadProductos == 0) {
    setMensajeria("No ha seleccionado productos");
  }

  /** Permite anular el pedido actual
   * y limpiar la canasta, luego redirige
   * pagina principal o home */
  const handleAnular = () => {
    setMensajeria("");
    setFlagCreaPedido(true);
    setPedido(new Pedido());
    setPedidoPorConfirmar(false);
    navigate("/");
  };

  /** Permite modificar el pedido
   * invoka api y luego redirige a pagina principal
   * muestra mensaje de resultado
   */

  const handleModificarPedido = () => {
    setMensajeria("");

    axios
      .put(URL_PATH_API+"/api/pedidos/pedido/" + pedido.ID, {
        username: sesion.username,
        tipoUsuario: sesion.tipoUsuario,
        cantidadProductos: pedido.cantidadProductos,
        total: pedido.total,
        items: pedido.items,
      })
      .then((res) => {
        console.log("respuesta crear pedido " + res);
        if (res.data.status == 0) {
          console.log("Modificado OK");
          setMensajeria("Pedido modificado ok, ID:" + pedido.ID);
          setPedido(new Pedido());
          setFlagCreaPedido(true);
          navigate("/");
        } else {
          setMensajeria("Error al modificar");
        }
      })
      .catch((error) => {
        console.log(error);
        setMensajeria("Error al modificar");
      });
    /**flag de uso global */
    setPedidoPorConfirmar(false);
  };

  /** Permite crear un pedido
   * invoka api
   * muestra como resultado el ID del pedido
   * o en caso contrario un mensaje de resultado o error
   */

  function handleRealizarPedido() {
    setMensajeria("");
    axios
      .post(URL_PATH_API+"/api/pedidos/pedido", {
        username: sesion.username,
        tipoUsuario: sesion.tipoUsuario,
        cantidadProductos: pedido.cantidadProductos,
        total: pedido.total,
        items: pedido.items,
      })
      .then((res) => {
        console.log("respuesta crear pedido " + res);
        /** Intepretacion de api status 0 es ok  */
        if (res.data.status == 0) {
          setMensajeria(
            "Pedido ingresado correctamente, ID:" + res.data.idPedido
          );
        }
        /** Limpia variables,estados, flags y redirige a pagina principal */
        setPedido(new Pedido());
        setPedidoPorConfirmar(false);
        setFlagCreaPedido(true);
        navigate("/");
      })
      .catch((error) => {
        setMensajeria("Error al crear pedido");
      });
  }
  return (
    <>
      <Header />
      <Popup mensaje={mensajeria} />
      <div class="container">
        <div class="row">
          {pedido.items.length > 0 ? (
            <div class="col-lg-12">
              {pedido.items.map((item) => {
                return (
                  <ItemProducto
                    ID={item.ID}
                    cantidad={item.cantidad}
                    nombre={item.nombre}
                    total={item.total}
                    urlFoto={item.urlFoto}
                  ></ItemProducto>
                );
              })}
            </div>
          ) : null}
          <div class="container">
            <div
              class="row listado center middle"
              hidden={pedido.cantidadProductos == 0}
            >
              <p class="fuenteEstandar">
                Cantidad productos: {pedido.cantidadProductos}&nbsp; Total:{" "}
                {(Math.round(pedido.total * 100) / 100).toFixed(2)} €
                {flagCreaPedido ? (
                  <button class="boton_estandar" onClick={handleRealizarPedido}>
                    Confirmar
                  </button>
                ) : (
                  <button
                    class="boton_estandar"
                    onClick={handleModificarPedido}
                  >
                    Confirmar
                  </button>
                )}
                <button class="boton_estandar" onClick={handleAnular}>
                  Anular
                </button>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {flagCreaPedido ? <Footer /> : null}
    </>
  );
}

export default VerPedido;
