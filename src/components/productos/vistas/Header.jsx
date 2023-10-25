import React from "react";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexto/Context";

function Header() {
  const navigate = useNavigate();
  const { sesion, setSesion}=useContext(Context);

   useEffect(() => {
    if(sesion==null || sesion==undefined){
      navigate("/login");

    }
  //    const sesionGuardada = Cookies.getItem("sesion");
  //   console.log(sesionGuardada);
    
  //   if (sesionGuardada) {
  //     setSesion(sesionGuardada);
  //     setNombre(sesion.nombre);

  //     if(sesion.tipoUsuario=='Administrador')
  //     {
  //       setFlagAdmin(true);
  //     }
  // } else {
  //     navigate("/");
  //   }
   }, []);

  // setSesion(user);
  function handleCerrar()
  {
    document.cookie = "sesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    Cookies.removeItem("session",'','');
    Cookies.removeItem("session");
    setSesion(()=>{
      return null});
      navigate("/");
  }

  return (
    <>
      <div><button onClick={()=>{navigate("/")}}>Home</button></div>
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
