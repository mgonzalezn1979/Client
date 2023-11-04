/**
 * Funcionalidad principal:HOME
 * Carga elementos luego de iniciar sesion correctamente
 * estos son los header, footer
 * y es la sección principal para seleccionar productos
 * 
 */

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

/** Componentes utilizados  */
import Header from "../../Header";
import Footer from "./Footer";
import Popup from "../../mensajeria/Popup";
import Producto from "./Producto";

/** Utiliza componentes globales del contexto  */
import { Context } from "../../contexto/Context";
import { useContext } from "react";

function Home() {

  /** variables o estados de contexto uso global en mensajeria popup */
  const { mensajeria, setMensajeria, URL_PATH_API } = useContext(Context);

  /** estados, variables y funciones de uso local */
  const [listado, setListado] = useState([]);
  const [status, setStatus] = useState(2);
  const [filtro, setFiltro] = useState(-1);
  const [tiposProducto, setTiposProductos] = useState([]);

  // const { setUrlBackend_dir } = useContext(Context);

  /** Funcion que permite obtener el ID del tipo 
   * de producto seleccionado 
   * retorna el ID o -1 en caso de no encontrarlo
   * estos datos  de uso global y se cargan al inicio
   * de la aplicacion y se accede mediante uso de contexto
   * */
  function obtieneIDtipoProducto(prod) {
    console.log("obtieneIDtipoProducto");
    for (let i = 0; i < tiposProducto.length; i++) {
      let nombre = tiposProducto[i].Nombre;
      if (prod.toString().toUpperCase() == nombre.toUpperCase()) {
        return tiposProducto[i].ID;
      }
    }    
    return -1;
  }


  useEffect(() => {

   /** Invoka a api para obtener los tipos de productos y setea uso global 
     * mediante el contexto
     * en caso de error muestra mensaje en compontente Popup  */
    axios
      .get(URL_PATH_API+"/api/productos/obtieneTiposDeProducto")
      .then((result) => {
        let resultado = result.data.data;
        setTiposProductos(resultado);
        console.log(resultado);
      })
      .catch((error) => {
        console.log(error);
        setMensajeria("Error en api");
      });
/** Invoka  api para obtener listado completo de productos
 * en caso de error muestra mensaje en compontente Popup
 */
    axios
      .get(URL_PATH_API+"/api/productos/obtieneListaProductos")
      .then((result) => {
        console.log("ok al conectar api productos");
        console.log(result.data.data.result);
        let resultado = result.data.data.result;
        setListado(resultado);
        setStatus(result.data.status);
        console.log(status);
        setFiltro(-1);
      })
      .catch((error) => {
        console.log("error:" + error);
        setMensajeria("Error en api");
      });
  }, []);

  return (
    <>
      <Header />
      <Popup mensaje={mensajeria} />
      <div class="container fluid">
 

        <div class="row  espacio_superior">
          <div class="col-lg-2"></div>
          <div class="col-lg-8">
            <div class="alert alert-warning" role="alert">
              <h4 class="alert-heading">
                <p class="descripcion">Elige tus productos</p>
              </h4>

              <p class="fuenteChica">
                Puedes seleccionar y ver nuestros productos, agregar a la canasta y luego al confirmar pedido
                tendras tu ID
              </p>
            </div>
          </div>
          <div class="col-lg-3"></div>
        </div>

        <div class="row">
          
          <div class="center col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 ">
            <button
              class="boton_estandar"
              onClick={() => {setMensajeria("");setFiltro(obtieneIDtipoProducto("Bebidas"))}}
            >
              Bebidas
            </button>
          </div>
          <div class="center col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 ">
            <button
              class="boton_estandar"
              onClick={() => {
                setMensajeria("");setFiltro(obtieneIDtipoProducto("Comida"))}}
            >
              Comida
            </button>
          </div>
          <div class="center col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 ">
            <button
              class="boton_estandar"
              onClick={() => {
                setMensajeria("");
                setFiltro(obtieneIDtipoProducto("Merchandise"));
              }}
            >
              Merchandise
            </button>
          </div>
          <div class="center col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 ">
            <button class="boton_estandar" onClick={() =>{
              setMensajeria("");
              setFiltro(-1);}}>
              Todo
            </button>
          </div>
         
        </div>
        <div class="row align-items-center">
          <div class="center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            {listado.length == 0 ? (
              <p>No hay productos</p>
            ) : (
              <>
                {listado.map((producto) => {
                  if (producto.tipoProducto == filtro)
                    return <Producto producto={producto} isAdmin={false} />;
                  else if (filtro == -1)
                    return <Producto producto={producto} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
                <Footer />    </>
  );
}
export default Home;
