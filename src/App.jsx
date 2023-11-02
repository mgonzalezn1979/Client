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
import Header from "./components/Header";
import MisPedidos from "./components/productos/vistas/MisPedidos";
import AdminProductos from "./components/mantenedor/AdminProductos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuienesSomos from "./components/quienes/quienesSomos";

import './styles/principal.css';
import BannerSuperior from "./components/BannerSuperior";

import imagenback from "./assets/imagenes/fondoprincipal.jpg";

function App() {
  //  const THIS_URL= "http://localhost:3000/";
   const [pedido,setPedido] = useState(new Pedido());
   const [iniciado, setIniciado] = useState(false);
   const [sesion, setSesion] = useState();
   const [flagCreaPedido, setFlagCreaPedido] =  useState(true);
   const [pedidoPorConfirmar, setPedidoPorConfirmar] = useState(false);
   const [tipoUsuario, setTipoUsuario] = useState("");
   const [tiposProducto, setTiposProducto] = useState([]);
   const [listado, setListado] = useState([]);
   const [urlBackend_dir, setUrlBackend_dir] = useState("");
   const [listadoPedidos, setListadoPedidos] = useState([]);//listado de pedidos de seccion Mis Pedidos
   const [mensajeria, setMensajeria] = useState("");
  
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

  function limpiarCarrito(){
    console.log("limpar carrito");
    setPedidoPorConfirmar(false);
    setPedido(new Pedido());
    setFlagCreaPedido(true); 
    actualizaResumen();
    console.log("limpio?"+pedido);
    localStorage.setItem('pedido', JSON.stringify(new Pedido()));
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

  function agregarProducto(ID, nombre, precio, urlFoto)
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
          item.urlFoto=null;
          if(urlFoto){
            item.urlFoto=urlFoto;            
          }
          
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
      console.log("recargar listado ");
      axios
        .get("http://localhost:3000/api/productos/obtieneTiposDeProducto")
        .then((data) => {
          console.log("data tipos de productos " + data);
          if (data) {
            setTiposProducto(Array.from(data.data.data));
          }
        })
        .catch((error) => {
          console.log("Error al obtener tipos de producto");
          console.log(error);
        });

      const sesionGuardada = Cookies.getItem("sesion");
      console.log(sesionGuardada);
      
      if (sesionGuardada) {
        console.log('guarda sesion iniciada');
        setSesion(JSON.parse(sesionGuardada));
        console.log('guardó sesion');
        const pedGuardado = localStorage.getItem('pedido');
        if(pedGuardado){
          setPedido(Pedido.convert(JSON.parse(pedGuardado)));
          actualizaResumen();
        }     
      }
    },[]);

    useEffect(()=>{
      console.log("pasa por useEffect de sesion en app.jsx");
      console.log("sesion es "+sesion);
    },[sesion]);

    useEffect(()=>
    {
      console.log("Listado actualizado se ha modificado ")
      listado.map(item=>{
        console.log(item);
      });
    },[listado]);

    useEffect(()=>{
      console.log("pasa por useEffect de PEDIDO en app.jsx");
      console.log("PEDIDO es "+pedido);
      localStorage.setItem('pedido',JSON.stringify(pedido));
    },[pedido])
  
    return (
    <div id="wrapper" style={{backgroundImage: `url(${imagenback})`}}>

 

      <Context.Provider
        value={{ pedido, setPedido, getProducto, 
          agregarProducto, actualizaResumen,
          agregarItemProducto, quitarItemProducto,
          eliminarProducto, sesion, setSesion,
          setFlagCreaPedido, flagCreaPedido,
          limpiarCarrito,setTipoUsuario, listado, setListado,
          tiposProducto, urlBackend_dir, setUrlBackend_dir,
          pedidoPorConfirmar, setPedidoPorConfirmar,
          listadoPedidos, setListadoPedidos,
          mensajeria, setMensajeria
          
         }}
      >     
       
        <Router>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/register" Component={Register} />
            <Route path="/verPedido" Component={VerPedido} />
            <Route path='/misPedidos' Component={MisPedidos} />
            <Route path='/quienesSomos' Component={QuienesSomos} />
            <Route path='/adminProductos' Component={AdminProductos} />
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
