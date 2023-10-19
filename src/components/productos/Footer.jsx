import React from "react";
import { useState, useEffect } from "react";
import { Pedido } from "../class/Pedido";
 
function Footer(){

    const [resumen, setResumen] = useState(
        {cantidadProductos:0,
        total:0}
    )

    const [pedidoActual, setPedidoActual] = useState(new Pedido());

    useEffect(()=>
    {   
    let ped = localStorage.getItem('pedidoActual');
    
    if(ped==null)
    {
        setPedidoActual(new Pedido());
        localStorage.setItem('pedidoActual',JSON.stringify(pedidoActual));
    }
    else{
        ped=JSON.parse(ped);
        ped=Pedido.convert(ped);
    setPedidoActual(ped);
    pedidoActual.actualizaResumen();
   // localStorage.setItem('pedidoActual',JSON.stringify(pedidoActual));
    }


    },[]);

     
    function handleVerPedido()
    {
        //navigate('/pedidos');
    }

    function handleRealizarPedido()
    {}

    return(
        <>
        <div>
            <div><p>icono</p>
             </div>
        

            <p>Total: {pedidoActual.total}</p>
            <p>Cantidad productos: {pedidoActual.cantidadProductos}</p>
            <button onClick={handleVerPedido}>Ver pedido</button>                      
        </div>
        <div>
        <button onClick={handleRealizarPedido}>Realizar pedido</button>
          
        </div>
        
            
        <div/></>
         
    )
}
export default Footer;