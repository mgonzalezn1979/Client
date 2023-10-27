import React  from "react";
import Cookies from 'js-cookies';
import { useContext,useEffect } from "react";
import { Context } from "../../contexto/Context";;

function Producto(producto)
{
    const {agregarProducto, pedido}=useContext(Context);
    console.log(pedido);
    useEffect(()=>{
        console.log("objeto producto");
        console.log(producto);
    },[]);

    
    function handleAgregarProducto()
    {         
        agregarProducto(producto.producto.ID, producto.producto.Nombre, producto.producto.precio);
    }
    return(<>
    <div><p></p>
        <div>Nombre: {producto.producto.Nombre}</div>
        <div>foto: {producto.urlFoto}</div>
        <div>Descripcion: {producto.producto.Descripcion}</div>
        <div>Precio: {producto.producto.precio}</div>
        <div><button onClick={handleAgregarProducto}>Agregar</button></div>
    </div>
    </>)
}
export default Producto;