import React from "react";
import { useState, useEffect } from "react";
// import { Pedido } from "../class/Pedido";
 
import { useContext } from "react";

import { Context } from "../../contexto/Context";
import { useNavigate } from "react-router-dom";


function Footer(){

//   const {{pedidoActual, setPedidoActual, incrementCantidad, decrementCantidad, incrementTotal, decrementTotal}=useContext(Context);
const { pedido, setPedido}=useContext(Context);

const navigate = useNavigate();
  
  
  //console.log(pedidoActual);
  
 

    // const [pedidoActual, setPedidoActual] = useState(new Pedido());
    const handleRealizarPedido =()=>
    {
        console.log('nodeberia ejecutar esto!');
    }
    const  handleVerPedido=()=>
    {        
        console.log("prueba cambiando atributo+"+pedido.total);

        navigate("/verPedido");

    }
    return(
        <>
        <div class="footer">
            
           
        {pedido.cantidadProductos==0 ? (
            <p>No hay pedido</p>
          ) : (
            <div class="container fluid">
              <div class="row">
            <div class="col-lg-8 ">
              <div class="">
              <p class="texto_descripcion">Total: { (Math.round(pedido.total * 100) / 100).toFixed(2)}  € 
                
            Cantidad productos: {pedido.cantidadProductos}
             </p>
            </div>
            </div>
            <div class="col-lg-3 ">
            <button class="boton_estandar" onClick ={handleVerPedido}>Ver pedido</button>   
            
              </div>
            </div>
            </div>
          )}
            
        </div></>
         
    )
}
export default Footer;