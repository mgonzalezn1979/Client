import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../contexto/Context";
import { useNavigate } from "react-router-dom";

function Footer() {
  const { pedido, setPedido , flagCreaPedido, pedidoPorConfirmar, setPedidoPorConfirmar} = useContext(Context);
  const navigate = useNavigate();
 console.log("pedidoPorConfirmar::"+pedidoPorConfirmar);
  const handleVerPedido = () => {
    setPedidoPorConfirmar(true);
    navigate("/verPedido");
  };
  return (
    <>
       
        {pedido.cantidadProductos == 0 ? (
          null
        ) : (
          <div class="container" hidden={pedidoPorConfirmar}>
            <div class="row ">
              <div class="col-lg-11 listado">
              
                       
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
