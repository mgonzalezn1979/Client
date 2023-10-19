import React from "react";
function Footer(){

    function handleVerPedido(){}

    function handleRealizarPedido()
    {}

    return(
        <>
        <div>
            <div><p>icono</p>
             </div>
        

            <p>Total:10.00 E</p>
            <p>Cantidad productos: 2</p>
            <button onClick={handleVerPedido}>Ver pedido</button>                      
        </div>
        <div>
        <button onClick={handleRealizarPedido}>Realizar pedido</button>
            
        </div>
        
            
        <div/></>
         
    )
}
export default Footer;