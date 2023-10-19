import React, { createContext, useContext } from "react";
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
import Home from "./components/productos/vistas/Home";
// import Pedidos from "./components/productos/vistas/MisPedidos";
 
function App() {
 
  
  return (
    <div>
      <Router>
        <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/home' Component={Home} />
        <Route path='/register' Component={Register} />
       
       

      <Route path='/' element=
      {Cookies.getItem("sesion")== undefined || Cookies.getItem("sesion")== null?
      <Navigate to={'login'}/>:
      <Navigate to={'home'}/>
      } />
        </Routes>
      </Router>   
      <p></p>
      <p></p>
    </div>
  )
}

export default App;
