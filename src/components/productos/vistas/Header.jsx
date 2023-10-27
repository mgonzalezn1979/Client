import React from "react";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexto/Context";
import { Pedido } from "../../../class/Pedido";

function Header() {
  const navigate = useNavigate();
  const { sesion, setSesion, flasetFlagCreaPedido, flagCreaPedido,
    limpiarCarritog}=useContext(Context);

   useEffect(() => {
    if(sesion==null || sesion==undefined || Cookies.getItem('sesion')==null){
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
    <>
      <div>
        <button onClick={()=>{navigate("/")}}>Home</button>
        </div>

        <div>
        <button onClick={()=>{navigate("/misPedidos")}}>Mis pedidos</button>
        </div>
        <div>
          {!flagCreaPedido?<button onClick={limpiarCarritog}>Pedido nuevo</button>
          :<p></p>}

        </div>
     {sesion!=null?
      <div>
        <h1>Bienvenido: {sesion.nombre}</h1>
        <p></p>
        <button onClick={handleCerrar} value="Cerrar sesion">Cerrar</button>
      </div>:<p>null</p>}
    
    </>
  );
}

export default Header;
