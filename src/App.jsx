/**
 * Aplicacion principal,
 * la logica de negocio en su gran mayoria está implementada aca,
 * y que mediante uso de contextos se puede acceder desde los subcomponentes
 *
 * tambien se define el ruteo
 */
import React, { useContext } from "react";
import { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/** Definicion de contexto  */
import { Context } from "./components/contexto/Context";
/** importaciond de librerias para uso de cookies y axios para invokar las api */
import Cookies from "js-cookies";
import axios from "axios";

/** Objetos o clases de uso comun*/
import { Pedido } from "./class/Pedido";
import { ItemPedido } from "./class/ItemPedido";

/*** Paginas principales*/
import Login from "./components/acceso/Login";
import Register from "./components/acceso/Register";
import Home from "./components/productos/vistas/Home";
import VerPedido from "./components/productos/vistas/VerPedido";
import MisPedidos from "./components/productos/vistas/MisPedidos";
import AdminProductos from "./components/mantenedor/AdminProductos";
import QuienesSomos from "./components/quienes/quienesSomos";

/** Definiciones de estilos  */
import "./styles/principal.css";
import imagenback from "./assets/imagenes/fondoprincipal.jpg";

/** Definicion principal APP*/
function App() {
  /*** serie de estados  y metodos utilizados en forma transversal y compartidos por contexto  */
  const [pedido, setPedido] = useState(new Pedido());
  const [iniciado, setIniciado] = useState(false);
  /** guarda la sesion rescatada de cookie y/o luego de validar usuario  */
  const [sesion, setSesion] = useState();
  /** flag para mostrar/ocultar componentes segun el estado de creacion de un pedido */
  const [flagCreaPedido, setFlagCreaPedido] = useState(true);
  /** flag que se setea cuando al momento de ver canasta el pedido queda en estado por confirmar o anular */
  const [pedidoPorConfirmar, setPedidoPorConfirmar] = useState(false);
  /** guarda el tipo de usuario si es cliente o administrador */
  const [tipoUsuario, setTipoUsuario] = useState("");
  /** guarda los tipos de productos al cargar la aplicacion a traves de la API  */
  const [tiposProducto, setTiposProducto] = useState([]);
  /** canasta de productos */
  const [listado, setListado] = useState([]);
  /** listado de pedidos del usuario de seccion mis pedidos */
  const [listadoPedidos, setListadoPedidos] = useState([]); //listado de pedidos de seccion Mis Pedidos
 /** se utiliza para mostar mensajes enn pantalla como resultado de alguan operacion exitosa o no */
  const [mensajeria, setMensajeria] = useState("");
  /** se agrega para definir el host de la api para modificar al realiza un deploy */
  const [URL_PATH_API, setURL_PATH_API] = useState("https://server-zi2v.onrender.com");
//en prod https://server-zi2v.onrender.com
//useState("http://localhost:3000");

  /** Mantiene el calculo de los totales, subtotal y cantidad de productos 
   * al crear y modificar el pedido 
   */
  function actualizaResumen() {
    let cantidad = 0;
    let total = 0;

    for (let i = 0; pedido.items && i < pedido.items.length; i++) {
      cantidad += pedido.items[i].cantidad;
      total += pedido.items[i].total;
    }
    pedido.cantidadProductos = cantidad;
    pedido.total = total;
    setPedido((state) => ({
      ...state,
    }));
  }

  /** permite quitar un producto de la canasta o al modificar pedido*/
  function quitarItemProducto(ID) {
    for (let i = 0; i < pedido.items.length; i++) {
      if (pedido.items[i].ID == ID) {
        pedido.items[i].cantidad--;
        pedido.items[i].total -= pedido.items[i].precio;
      }
    }    
    actualizaResumen();
  }

  /**Permite inicializar variables y estados para crear un nuevo pedido */
  function limpiarCarrito() {
    console.log("limpar carrito");
    setPedidoPorConfirmar(false);
    setPedido(new Pedido());
    setFlagCreaPedido(true);
    actualizaResumen();  
    localStorage.setItem("pedido", JSON.stringify(new Pedido()));//almacena pedido actual
  }

  /** Permite agregar un producto a la canasta al modificar pedido*/
  function agregarItemProducto(ID) {
    for (let i = 0; i < pedido.items.length; i++) {
      if (pedido.items[i].ID == ID) {
        pedido.items[i].cantidad++;
        pedido.items[i].total += pedido.items[i].precio;
      }
    }
    actualizaResumen();
  }

  /** Permite eliminar un producto de la canasta ya sea al crear el pedido o al modificar */
  function eliminarProducto(ID) {
    console.log("eliminar producto ID:" + ID);
    pedido.items = pedido.items.filter((item) => item.ID != ID);
    actualizaResumen();
  }

  /** Permite agregar producto al crear pedido */
  function agregarProducto(ID, nombre, precio, urlFoto) {
    let item = getProducto(ID);

    if (item == null) {
      item = new ItemPedido();
      item.ID = ID;
      item.nombre = nombre;
      item.total = precio;
      item.precio = precio;
      item.cantidad = 1;
      item.urlFoto = null;
      if (urlFoto) {
        item.urlFoto = urlFoto;
      }
      pedido.items.push(item); //agrega item nuevo
    } else {
      item.cantidad++;
      item.total += precio;
      for (let i = 0; i < pedido.items.length; i++) {
        if (pedido.items[i].ID == item.ID) {
          pedido.items[i] = item; //actualiza item
        }
      }
    }
    actualizaResumen();//render totales
  }

  /** Obtiene contenido de un producto seleccionado por ID :
   * producto se compone por:
   * (ID,nombre, descripcion, precio, urlFoto)
   */
  function getProducto(ID) {
    if (pedido.items) {
      for (let i = 0; i < pedido.items.length; i++) {
        if (pedido.items[i].ID == ID) {
          return pedido.items[i];
        }
      }
    }
    return null;
  }

  /** Hook que permite al inicio cargar la data necesaria base
   * 
   * se invoka api obtieneTiposDeProducto para utilizar en forma transversal
   * en los demas componentes
   * luego valida la sesion guardada en cookies y recupera el pedido
   * guardado en canasta
  */
  useEffect(() => {

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
      console.log("guarda sesion iniciada");
      setSesion(JSON.parse(sesionGuardada));
      console.log("guardó sesion");
      const pedGuardado = localStorage.getItem("pedido");
      if (pedGuardado) {
        setPedido(Pedido.convert(JSON.parse(pedGuardado)));
        actualizaResumen();
      }
    }
  }, []);


  /** Actualiza la canasta u objeto pedidos en localstorage */
  useEffect(() => {
    console.log("pasa por useEffect de PEDIDO en app.jsx");
    console.log("PEDIDO es " + pedido);
    localStorage.setItem("pedido", JSON.stringify(pedido));
  }, [pedido]);

  return (
    <div id="wrapper" style={{ backgroundImage: `url(${imagenback})` }}>
      <Context.Provider
        value={{
          pedido,
          setPedido,
          getProducto,
          agregarProducto,
          actualizaResumen,
          agregarItemProducto,
          quitarItemProducto,
          eliminarProducto,
          sesion,
          setSesion,
          setFlagCreaPedido,
          flagCreaPedido,
          limpiarCarrito,
          setTipoUsuario,
          listado,
          setListado,
          tiposProducto,
          pedidoPorConfirmar,
          setPedidoPorConfirmar,
          listadoPedidos,
          setListadoPedidos,
          mensajeria,
          setMensajeria,
          URL_PATH_API
        }}
      >
        <Router>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/register" Component={Register} />
            <Route path="/verPedido" Component={VerPedido} />
            <Route path="/misPedidos" Component={MisPedidos} />
            <Route path="/quienesSomos" Component={QuienesSomos} />
            <Route path="/adminProductos" Component={AdminProductos} />
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
