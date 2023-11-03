/** funcionalidad principal MisPedidos
 * 
 * Permite ver la lista de pedidos generados por el usuario
 * 
 ******/

import React from "react";
import { useState, useEffect,useContext } from "react";

/**utiliza cookies y axios para invokar api  */
import Cookies from "js-cookies";
import axios from "axios";
import { Context } from "../../contexto/Context";
 
/** componentes extenos utilizados para visualizar detalles de pedido(por pediodo)
 * header para encabezado y popup para mensajeria  */
import PedidoDetalle from "./PedidoDetalle";
import Header from "../../Header";
import Popup from "../../mensajeria/Popup"; 

function MisPedidos() {

  /**elementos de uso global del contexto para poder operar */
  const { URL_PATH_API, listadoPedidos,  setListadoPedidos, mensajeria, setMensajeria} = useContext(Context);
  

  /** Permite cargar el listado de pedidos del usuario 
   * invokando api de pedidos 
   * listaPedidos
   */
  useEffect(() => {

    setListadoPedidos([]);
    const sesion = Cookies.getItem("sesion");
    if (sesion != null || sesion != undefined) {
      //Si hay sesion valida entonces
      const username = JSON.parse(sesion).username;
      console.log("username para el request es " + username);
      if (username != null || username != undefined) {
        console.log("llamar al a api de listado de pedidos");
        axios
          .post(URL_PATH_API+"/api/pedidos/listaPedidos", {
            username: username,
          })
          .then((result) => {
            console.log("lista de pedidos ");
            let resultado = Array.from(result.data.pedidos);
            let listado  = [];
            resultado.forEach((item) => {
              listado.push(item);
            });
            setListadoPedidos(listado);
            console.log(listado);
            console.log(listado.length);
            if(listado.length==0){
              setMensajeria("No tiene pedidos");
            }
          })
          .catch((error) => {
            console.log(error);
            setMensajeria("Error al buscar pedidos");
          });
      } else {
        console.log("no hay sesion activa, redirige a home");
      }
    }
  }, []); 

  return (
    <div>
      <Header />
      <div class="container fluid">
        <div class="row">
      <div><center>
        <p class="fuenteGrande texto_blanco center">Mis Pedidos</p></center>
      </div>
      </div>
      <div class="row">
      <Popup mensaje={mensajeria} />
      </div>
      </div>        
        {listadoPedidos == undefined ? (
          <p>No hay pedidos</p>
        ) : (
          <div>
            {listadoPedidos.map((producto) => {
              return <div key={producto.ID}><PedidoDetalle detalle={producto} ID_Pedido={producto.ID} urlFoto={producto.urlFoto} /></div>;
            })}
          </div>
        )}
      </div>    
  );
}
export default MisPedidos;
