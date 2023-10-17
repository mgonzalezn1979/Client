import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate  
} from "react-router-dom";
import Cookies from "js-cookies";
import Login from "./acceso/Login";
import Register from "./acceso/Register";
import Home from "./components/productos/Home";

function App() {
  const [email, setEmail] = useState();
  const [nombre, setNombre] = useState();
  const [usuarioSesion, setUsuarioSesion] = useState([]);
  
  console.log(email);
  console.log(nombre);
  console.log(usuarioSesion);

  useEffect(() => {
    const emailGuardado = Cookies.getItem("email");
    const nombreGuardado = Cookies.getItem("Nombre");
    const sesionUsuarioGuardado = Cookies.getItem("sesion");

    console.log("emailGuardado:"+emailGuardado);
    console.log("nombreGuardado:"+nombreGuardado);
    console.log("sesionUsuarioGuardado:"+sesionUsuarioGuardado);
    
    if (emailGuardado!=null) 
    {
      setEmail(emailGuardado);
    }
    
    if (nombreGuardado!=null) 
     {
      setNombre(nombreGuardado);
    }
    if (sesionUsuarioGuardado!=null) {
      setUsuarioSesion(sesionUsuarioGuardado);
      console.log("setea la wea  :");
    }
 
  }, []);

  return (
    <div>
      <Router>
        <Routes>
        <Route path='/login' Component={Login} />
      <Route path='/register' Component={Register} />
      <Route path='/' element={Cookies.getItem("sesion")== undefined ?<Navigate to={'login'}/>:
      <Home/>} />




          
        </Routes>
      </Router>

      <p>inicio sesion?</p>
      <p>usuario sesion:{usuarioSesion}</p>
      <p>{email}</p>
      <p>{nombre}</p>
    </div>
  )
}

export default App;
