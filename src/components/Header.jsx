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
import logo from "../assets/imagenes/logo.png";

function Header() {
  const navigate = useNavigate();
  const { setMensajeria,sesion, setSesion, tipoUsuario, pedidoPorConfirmar, setPedidoPorConfirmar}=useContext(Context);

    console.log("tipo usuairo "+tipoUsuario);

   useEffect(() => {
    if(Cookies.getItem('sesion')==null){
      navigate("/login");
    }else{
      setSesion(JSON.parse(Cookies.getItem('sesion')))
    }
   }, []);

  function handleCerrar()
  {
    document.cookie = "sesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    Cookies.removeItem("session",'','');
    Cookies.removeItem("session");
    Cookies.removeItem('pedido');
    Cookies.removeItem('pedido','');
   
    setSesion(()=>{
      return null});
      navigate("/");
  }

  return (    
<div class="container fluid">&nbsp;
        <div class="row align-items-center encabezado">
          <div class="col-lg-1 ">           
                         
                <a href="/">
                  <img src={logo} class="icono"></img>
                </a>              
             
          </div>

          <div class="col-lg-3 middle margen-top">
            {sesion!=null?<p class="fuenteChica">Hola {sesion.nombre}</p>
            :null} 
                    
          </div>
          <div class="col-lg-2">            
             <button class="boton_estandar_2" onClick={handleCerrar} >Cerrar</button>       
          </div>
        
          <div class="col-lg-3" hidden={sesion.tipoUsuario!='Administrador'}>
          {
        (sesion && sesion.tipoUsuario=='Administrador')?<p>
          <button id="boton_estandar_admin" onClick={()=>{navigate("/adminProductos")}}>Productos</button>
        </p>:
        <p>no es admin ${tipoUsuario}</p>
        }
          </div>
          <div class="col-lg-1" >            
            <img src={pedidos} class="icono" onClick={()=>{
              setMensajeria("");
              navigate("/misPedidos");}}></img>
           </div>   

           
          <div class="col-lg-1">
           <img src={cesta} class="icono" 
           onClick={()=>
           {setPedidoPorConfirmar(true);navigate("/verPedido");}}></img></div>
            
            
        </div>  
        </div>   
  );
}

export default Header;
