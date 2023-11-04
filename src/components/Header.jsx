/**
 * Funcion principal Header:
 * Es un componente que realiza rol de encabezado del sitio
 * cuando se ha iniciado sesion
 * 
 * 
 * permite cerrar sesion, ir a canasta, ir a "mis pedidos"
 * realizando clic sobre los botones e iconos
 */
import React from "react";
import { useEffect, useContext } from "react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
/** utiliza contexto para acceder a los estados, variables y metodos de uso global o superior */
import { Context } from "./contexto/Context";

/** Imagenes */
import cesta from "../assets/imagenes/cesta.png";
import pedidos from "../assets/imagenes/pedidos.png";
import logo from "../assets/imagenes/logo.png";

/** */
function Header() {

  const navigate = useNavigate();
  /** carga componentes del contexto a utilizar */
  const {
    setMensajeria,
    sesion,
    setSesion,    
    setPedidoPorConfirmar,
  } = useContext(Context);

  /** Al cargar verifica la existencia de la cookie de sesion */
  useEffect(() => {
    if (Cookies.getItem("sesion") == null) {
      navigate("/login");
    } else {
      setSesion(JSON.parse(Cookies.getItem("sesion")));
    }
  }, []);

  /** Permite cerrar sesion */
  function handleCerrar() {
    document.cookie = "sesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    Cookies.removeItem("session", "", "");
    Cookies.removeItem("session");
    localStorage.removeItem("pedido");

    setSesion(() => {
      return null;
    });
    navigate("/");
  }

  return (
    <div class="container fluid ">
     
      <div class="row encabezado">
        <div class="contenido_header col-xl-1 col-lg-1 col-xs-12 col-md-1 col-sm-12">
          
            <img src={logo} class="icono" onClick={() => {
              setMensajeria("");
              navigate("/");
            }}></img><br/><p class="fuenteChica"
            onClick={()=>{
              setMensajeria("");
              navigate("/");}}
            >Home</p>
           
        </div>

        <div class="contenido_header col-xl-2 col-lg-2 col-xs-12 col-md-2 col-sm-12">
          {sesion != null ? (
            <span class="fuenteChica">Hola <br/>{sesion.nombre}</span>
          ) : null}
        </div>  
       
        <div class="contenido_header col-xl-2 col-lg-2 col-xs-1 col-md-3 col-sm-12">
          <img
            src={pedidos}
            class="icono"
            onClick={() => {
              setMensajeria("");
              navigate("/misPedidos");
            }}
          ></img><br/><p class="fuenteChica" 
          onClick={()=>{
            setMensajeria("");
            navigate("/misPedidos");}}
            >
            Mis Pedidos</p>
          
        </div>

        <div class="contenido_header col-xl-2 col-lg-2 col-xs-1 col-md-2 col-sm-12">
          <img
            src={cesta}
            class="icono"
            onClick={() => {
              setPedidoPorConfirmar(true);
              navigate("/verPedido");
            }}
          ></img><br/><p class="fuenteChica"
          onClick={()=>{
            setMensajeria("");
            navigate("/verPedido");}}>Canasta</p>
        </div>
        <div class="contenido_header col-xl-2 col-lg-2 col-xs-12 col-md-5 col-sm-12" >
        <p>{sesion && sesion.tipoUsuario == "Administrador" ?(
            
              <button
                id="boton_estandar_admin"
                onClick={() => {
                  navigate("/adminProductos");
                }}
              >
                Productos
              </button>
            ):null}</p></div>
        <div class="contenido_header col-xl-2 col-lg-3 col-xs-12 col-md-1 col-sm-12">
          <button class="boton_estandar_2" onClick={handleCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
export default Header;
