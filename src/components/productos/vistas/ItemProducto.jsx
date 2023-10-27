import React from "react";
import { useContext } from "react";
import { Context } from "../../contexto/Context";

function ItemProducto({cantidad, nombre, total, ID}){
    console.log("item Producto ID:"+ID);


    
    const flag = cantidad>1?false:true;

    const { agregarItemProducto, quitarItemProducto, eliminarProducto}=useContext(Context);
    
    function handleAgregarItemProducto(){
        agregarItemProducto(ID);
    }
    
    function handleQuitarItemProducto()
    {
        quitarItemProducto(ID);
    }
    
    function handleEliminarProducto(){
        eliminarProducto(ID);
    }
    return(
 <li key={ID}>
    <button onClick={handleEliminarProducto} >Eliminar</button>
    <p>{cantidad} x {nombre} total:{total} </p>
    <button onClick={handleAgregarItemProducto} >+</button>
    <button onClick={handleQuitarItemProducto} disabled={flag} >-</button>
    </li>
    
  
)

}
export default ItemProducto;