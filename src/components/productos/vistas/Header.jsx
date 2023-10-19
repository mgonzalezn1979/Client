import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";

function Header() {
  const [sesion, setSesion] = useState([]);
  const [flagAdmin, setFlagAdmin] = useState(false);
  const [nombre, setNombre] = useState()

  const navigate = useNavigate();

  useEffect(() => {
     const sesionGuardada = Cookies.getItem("sesion");
    console.log(sesionGuardada);
    
    if (sesionGuardada) {
      setSesion(sesionGuardada);
      setNombre(sesion.nombre);

      if(sesion.tipoUsuario=='Administrador')
      {
        setFlagAdmin(true);
      }


    } else {
      navigate("/");
    }
  }, []);

  // setSesion(user);
  function handleCerrar()
  {
    document.cookie = "sesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    Cookies.removeItem("session",'','');
    Cookies.removeItem("session");
    
    console.log(Cookies.hasItem('sesion'));

    
    if(Cookies.hasItem('sesion')==false)
    {
    setSesion(null);
    navigate('/home');
    }
    else{
        console.log('No elimino la wea');
    }
  }

  return (
    <>
      <div>aca la info de perfil y botones principales {sesion}</div>
     {sesion!=null?
      <div>
        <h1>Bienvenido: {nombre}</h1>
        <p>{flagAdmin}</p>
        <button onClick={handleCerrar} value="Cerrar sesion">Cerrar</button>
      </div>:<p>null</p>}
    
    </>
  );
}

export default Header;
