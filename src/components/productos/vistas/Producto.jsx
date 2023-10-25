import React, { useEffect }  from "react";
import Cookies from 'js-cookies';
// import {Producto} from "../../../class/";
import { useContext } from "react";
// import StateContext from "./components/class/contexto/StateContext";
import { Context } from "../../contexto/Context";;
function Producto(producto)
{
    // const {pedidoActual, actualiza, setPedidoActual}=useContext(Context);

    const {agregarProducto, pedido, setPedido}=useContext(Context);
    console.log(pedido);
    
    useEffect(()=>{
        console.log("objeto producto");
        console.log(producto);
    },[]);

    /*const sumar=()=>{
    setPedido((prevState) => {
        prevState.cantidadProductos++;
        prevState.total+=producto.producto.precio;
        console.log("actualiza la wea porfa: ", prevState);
        return prevState;
      });
      

      setPedido(state => ({
        ...state        
      }));
    }*/
    function handleAgregarProducto()
    {   
        //let cart = Cookies.getItem('productosPedido'); 
        //actualizaPedido(pedidoActual);
         
        agregarProducto(producto.producto.ID, producto.producto.Nombre, producto.producto.precio);
        //setPedidoActual(pedidoActual);
        //console.log("producto agregadook");
        /*localStorage.setItem('pedidoActual',JSON.stringify(pedidoActual));
        cart = cart?JSON.parse(cart):[];
        cart.push(producto);
        cart.sort();
        Cookies.setItem('productosPedido',JSON.stringify(cart),{expires:1});
        console.log(cart);
        */
        
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