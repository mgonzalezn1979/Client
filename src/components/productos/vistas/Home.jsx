import React from "react";
import {useState, useEffect} from 'react';
import Cookies from 'js-cookies';
import Header from "./Header";



function Home()
{

    const [sesion, setSesion] = useState();
    const [nombre, setNombre] = useState();
    const [apellidos, setApellidos] = useState();
    const [tipoUsuario, setTipoUsuario] = useState();
   
    


  useEffect(()=>
  {
    const sessionGuardada = Cookies.getItem('sesion') !=null?JSON.parse(Cookies.getItem('sesion')):null;
    if(sessionGuardada)
    {
      setSesion(sessionGuardada);
      console.log('setea sesion guardada');
    }
     



  },[]);

    return(
        <>
        <p>Home con sesion iniciada</p>
        <Header/>
        </>
    )

}
export default Home;