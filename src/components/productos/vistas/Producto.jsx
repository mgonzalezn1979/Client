import React, { useEffect }  from "react";

function Producto(producto)
{


    useEffect(()=>{
        console.log("objeto producto");
        console.log(producto);
    },[]);

    function handleAgregarProducto(e){}
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