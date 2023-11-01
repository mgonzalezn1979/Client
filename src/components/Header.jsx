import React from "react";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
import { Context } from "./contexto/Context";
import { Pedido } from "../class/Pedido";


import iconoHome from "../assets/imagenes/home.png";
import cesta from "../assets/imagenes/cesta.png";
import pedidos from "../assets/imagenes/pedidos.png";
import nuevo from "../assets/imagenes/nuevo.png";

function Header() {
  const navigate = useNavigate();
  const { sesion, setSesion, flasetFlagCreaPedido, flagCreaPedido,
    limpiarCarrito, tipoUsuario}=useContext(Context);

    console.log("tipo usuairo "+tipoUsuario);

   useEffect(() => {
    if(Cookies.getItem('sesion')==null){
      navigate("/login");
    }
   }, []);

  function handleCerrar()
  {
    document.cookie = "sesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    Cookies.removeItem("session",'','');
    Cookies.removeItem("session");
    Cookies.removeItem('pedido');
    Cookies.removeItem('pedido','');
   // setPedido(new Pedido());
    setSesion(()=>{
      return null});
      navigate("/");
  }

  return (    
<div class="container fluid">
        <div class="row align-items-center">
          <div class="col-lg-1">           
                         
                <a href="/">
                  <img src={iconoHome} class="icono"></img>
                </a>              
             
          </div>

          <div class="col-lg-3">
            {sesion!=null?<h3>Bienvenido<br/>{sesion.nombre}</h3>
            :null} 
             <button class="boton_estandar"onClick={handleCerrar} >Cerrar</button>       
          </div>
        
          <div class="col-lg-3">
          {
        (sesion && sesion.tipoUsuario=='Administrador')?<p>
          <button class="boton_estandar" onClick={()=>{navigate("/adminProductos")}}>Productos</button>
        </p>:
        <p>no es admin ${tipoUsuario}</p>
        }
          </div>
          <div class="col-lg-2">           
                         
                <a href="/misPedidos">
                  <img src={pedidos} class="icono"></img>
                </a>              
             
          </div>
          <div class="col-lg-1">
          <img src={nuevo} class="icono"></img>
          {!flagCreaPedido?<button onClick={limpiarCarrito}>Pedido nuevo</button>
          :<p></p>}
          </div>
          <div class="col-lg-1">                         
                         <a href="/verPedido">
                           <img src={cesta} class="icono"></img>
                         </a>    
                      
            </div>
        </div>  
        </div>   
  );
}

export default Header;
