/** Funcionalidad principal Footer:
 * Muestra un resumen de los productos seleccionados,
 * esto es total y cantidad de productos, agrega el boton
 * ver pedido para poder continuar
*/

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Utiliza elementos globales del contexto */
import { useContext } from "react";
import { Context } from "../../contexto/Context";

function Footer() {
  /** Elementos globales para mantener renderizado los totales en caso de existir un pedido */
  const { pedido, pedidoPorConfirmar, setPedidoPorConfirmar} = useContext(Context);
  
  const navigate = useNavigate();
 
  /** Permite redirigir a componente que mantiene el pedido vigente actual  */
  const handleVerPedido = () => {
    setPedidoPorConfirmar(true);
    navigate("/verPedido");
  };
  return (<>       
        {pedido.cantidadProductos == 0 ? (
          null
        ) : (
          <div class="container footer" hidden={pedidoPorConfirmar}>
            <div class="row  center align-items-center listado">
              <div class="col-xl-11 col-lg-11 col-xs-12 col-md-12 col-sm-12 ">
                  <p class="fuenteEstandar">
                    Total: {(Math.round(pedido.total * 100) / 100).toFixed(2)} €
                    Cantidad productos: {pedido.cantidadProductos}                           
               
                <button class="boton_estandar" onClick={handleVerPedido}>
                  Ver pedido
                </button> </p>  
                </div>             
            </div>
          </div>
        )}   
    </>
  );
}
export default Footer;
