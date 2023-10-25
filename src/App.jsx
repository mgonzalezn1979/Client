import React, { useContext } from "react";
import { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookies";
import Login from "./components/acceso/Login";
import Register from "./components/acceso/Register";
import Home from "./components/productos/vistas/Home";
import { Pedido } from "./class/Pedido";
import { ItemPedido } from "./class/ItemPedido";
import { Context } from "./components/contexto/Context";
import VerPedido from "./components/productos/vistas/VerPedido";
import Header from "./components/productos/vistas/Header";
import { useNavigate } from "react-router-dom";

function App() {
   const [pedido,setPedido] = useState(new Pedido());
   const [iniciado, setIniciado] = useState(false);
   const [sesion, setSesion] = useState();
 

  function actualizaResumen()
  {
  let cantidad = 0;
  let total = 0;
  
  for(let i=0;pedido.items && i<pedido.items.length;i++)
  {
      cantidad+=pedido.items[i].cantidad;
      total+=pedido.items[i].total;
  }   
  pedido.cantidadProductos = cantidad;
  pedido.total=total;
 setPedido(state => ({
    ...state        
  }));
  }

  function quitarItemProducto(ID)
  {
    
    for(let i=0;i<pedido.items.length;i++)
    {
        if(pedido.items[i].ID==ID)
        {
            pedido.items[i].cantidad--;
            pedido.items[i].total-=pedido.items[i].precio;
        }
    }

  console.log("quitar item producto");
  actualizaResumen();
  }
  
  function agregarItemProducto(ID)
  {
    console.log("agregar item producto ID:"+ID);
    for(let i=0;i<pedido.items.length;i++)
    {
        if(pedido.items[i].ID==ID)
        {
            pedido.items[i].cantidad++;
            pedido.items[i].total+=pedido.items[i].precio;
        }
    }
    actualizaResumen();
  }
    
  function eliminarProducto(ID) {
    console.log("eliminar producto ID:"+ID);
    pedido.items = pedido.items.filter(item=>item.ID!=ID);
    actualizaResumen();
    }

  function agregarProducto(ID, nombre, precio)
  {
      
      let item = getProducto(ID);

      if(item==null)
      {
          item = new ItemPedido();
          item.ID=ID;
          item.nombre=nombre;
          item.total=precio;
          item.precio=precio;
          item.cantidad=1;
          pedido.items.push(item);//agrega item nuevo
      }
      else{
          item.cantidad++;
          item.total+=precio;
          for(let i=0;i<pedido.items.length;i++)
          {
              if(pedido.items[i].ID==item.ID)
              {
                  pedido.items[i] = item;//actualiza item
              }
          }
      }
      actualizaResumen();       
  }

  function getProducto(ID)
  {
    if(pedido.items){
      for(let i=0;i<pedido.items.length;i++){
          if(pedido.items[i].ID==ID)
          { 
              return pedido.items[i];
          }
      }
    }
  return null;
  }  
    useEffect(()=>{
      console.log("inicia proxy valida sesion al iniciar");

      const sesionGuardada = Cookies.getItem("sesion");
      console.log(sesionGuardada);
      
      if (sesionGuardada) {
        console.log('guarda sesion iniciada');
        setSesion(JSON.parse(sesionGuardada));
        console.log('guardó sesion');
        // setSesion(state => ({
        //   ...state        
        // }));
      }

    },[]);

    useEffect(()=>{
      console.log("pasa por useEffect de sesion en app.jsx");
      console.log("sesion es "+sesion);
    },[sesion]);



    


  
    return (
    <div>
 

      <Context.Provider
        value={{ pedido, setPedido, getProducto, 
          agregarProducto, actualizaResumen,
          agregarItemProducto, quitarItemProducto,
          eliminarProducto, sesion, setSesion
         }}
      >
       
        <Router>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/register" Component={Register} />
            <Route path="/verPedido" Component={VerPedido} />
            
            

            <Route
              path="/"
              element={
                Cookies.getItem("sesion") == undefined ||
                Cookies.getItem("sesion") == null ? (
                  <Navigate to={"login"} />
                ) : (
                  <Navigate to={"home"} />
                )
              }
            />
        
            
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
