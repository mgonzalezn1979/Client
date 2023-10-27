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
        <div>
            
           
        {pedido.cantidadProductos==0 ? (
            <p>No hay pedido</p>
          ) : (
            <div>
               
            <p>Total: { (Math.round(pedido.total * 100) / 100).toFixed(2)}  €</p>
            <p>Cantidad productos: {pedido.cantidadProductos}</p>
            <button onClick ={handleVerPedido}>Ver pedido</button>   
            </div>
          )}
            
        </div></>
         
    )
}
export default Footer;