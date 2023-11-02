import React from "react";
// import ReactDOM} from "react-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookies";
import Header from "../../Header";
import Footer from "./Footer";
import axios from "axios";
import Producto from "./Producto";
import { Pedido } from "../../../class/Pedido";
import { Context } from "../../contexto/Context";
import lateralder from "../../../assets/imagenes/lateral_decorativo_cafe_matcha.jpg";
import Popup from "../../mensajeria/Popup";
import { useContext } from "react";

function Home() {
  const { mensajeria, setMensajeria, agregarProducto, pedido, setPedido,flagCreaPedido, pedidoPorConfirmar } = useContext(Context);
  const [listado, setListado] = useState([]);
  const [status, setStatus] = useState(2);
  const [filtro, setFiltro] = useState(-1);
  const [tiposProducto, setTiposProductos] = useState([]);

  const { urlBackend_dir, setUrlBackend_dir } = useContext(Context);

  function obtieneIDtipoProducto(prod) {
    console.log("obtieneIDtipoProducto");
    for (let i = 0; i < tiposProducto.length; i++) {
      let nombre = tiposProducto[i].Nombre;
      if (prod.toString().toUpperCase() == nombre.toUpperCase()) {
        return tiposProducto[i].ID;
      }
    }
    console.log("no encontrado");
    return -1;
  }

  useEffect(() => {

    axios
      .get("http://localhost:3000/api/parametros/getURLBackend")
      .then((result) => {
        console.log("url backend " + result.data.data);
        setUrlBackend_dir(result.data.data);
      })
      .catch((error) => {
        console.log("error " + error);
        setMensajeria("Error en api");
      });

    axios
      .get("http://localhost:3000/api/productos/obtieneTiposDeProducto")
      .then((result) => {
        let resultado = result.data.data;
        setTiposProductos(resultado);
        console.log(resultado);
      })
      .catch((error) => {
        console.log(error);
        setMensajeria("Error en api");
      });

    axios
      .get("http://localhost:3000/api/productos/obtieneListaProductos")
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
      <div class="container fluid">
        <div
          class="row align-items-center"
          hidden={mensajeria == "" ? true : false}
        >
          <div class="col-lg-3"></div>
          <div class="col-lg-6">
            {mensajeria.length > 0 ? <Popup mensaje={mensajeria} /> : null}
          </div>
          <div class="col-lg-3"></div>
        </div>

        <div class="row ">
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
          <div class="col-lg-1">
            <p></p>
          </div>
          <div class="col-lg-2">
            <button
              class="boton_estandar"
              onClick={() => {setMensajeria("");setFiltro(obtieneIDtipoProducto("Bebidas"))}}
            >
              Bebidas
            </button>
          </div>
          <div class="col-lg-2">
            <button
              class="boton_estandar"
              onClick={() => {
                setMensajeria("");setFiltro(obtieneIDtipoProducto("Comida"))}}
            >
              Comida
            </button>
          </div>
          <div class="col-lg-2">
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
          <div class="col-lg-2">
            <button class="boton_estandar" onClick={() =>{
              setMensajeria("");
              setFiltro(-1);}}>
              Todo
            </button>
          </div>
          <div class="col-lg-1">
            <p></p>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-12">
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
