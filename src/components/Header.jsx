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
    <div class="container fluid">
     
      <div class="row align-items-center encabezado">
        <div class="col-lg-1 ">
          <a href="/">
            <img src={logo} class="icono"></img>
          </a>
        </div>

        <div class="col-lg-3 middle margen-top">
          {sesion != null ? (
            <p class="fuenteChica">Hola {sesion.nombre}</p>
          ) : null}
        </div>
        <div class="col-lg-3" hidden={sesion.tipoUsuario == "Administrador"}>
          
        </div>
        <div class="col-lg-2 ">
          <button class="boton_estandar_2" onClick={handleCerrar}>
            Cerrar
          </button>
        </div>

        <div class="col-lg-3" hidden={sesion.tipoUsuario != "Administrador"}>
          {sesion && sesion.tipoUsuario == "Administrador" ? (
            <p>
              <button
                id="boton_estandar_admin"
                onClick={() => {
                  navigate("/adminProductos");
                }}
              >
                Productos
              </button>
            </p>
          ) : null}
        </div>
        
        <div class="col-lg-1">
          <img
            src={pedidos}
            class="icono"
            onClick={() => {
              setMensajeria("");
              navigate("/misPedidos");
            }}
          ></img>
        </div>

        <div class="col-lg-1">
          <img
            src={cesta}
            class="icono"
            onClick={() => {
              setPedidoPorConfirmar(true);
              navigate("/verPedido");
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}
export default Header;
