import React, { useEffect }  from "react";
import Cookies from 'js-cookies';
import { Pedido } from "../../class/Pedido";
function Producto(producto)
{


    useEffect(()=>{
        console.log("objeto producto");
        console.log(producto);
    },[]);

    function handleAgregarProducto()
    {
        let cart = Cookies.getItem('productosPedido');
        let pedidoActual = localStorage.getItem('pedidoActual');
        if(pedidoActual==null)
        {
            pedidoActual = new Pedido();
        }
        else{
            pedidoActual = JSON.parse(pedidoActual);
            pedidoActual = Pedido.convert(pedidoActual);
        }
        
        pedidoActual.agregarProducto(producto.producto.ID, producto.producto.Nombre, producto.producto.precio);
        localStorage.setItem('pedidoActual',JSON.stringify(pedidoActual));
        cart = cart?JSON.parse(cart):[];
        cart.push(producto);
        cart.sort();
        Cookies.setItem('productosPedido',JSON.stringify(cart),{expires:1});
        console.log(cart);
        console.log("producto agregadook");
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