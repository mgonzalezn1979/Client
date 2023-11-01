import React from "react";
// import ReactDOM} from "react-dom";
import { useState, useEffect} from "react";
import Cookies from "js-cookies";
import Header from "../../Header";
import Footer from "./Footer";
import axios from "axios";
import Producto from "./Producto";
import { Pedido } from "../../../class/Pedido";
import { Context } from "../../contexto/Context";;
import lateralder from "../../../assets/imagenes/lateral_decorativo_cafe_matcha.jpg"
 
import { useContext } from "react";


function Home() {
  
  const {agregarProducto, pedido, setPedido}=useContext(Context);
  const [listado, setListado] = useState([]);
  const [status, setStatus] =   useState(2);
  const [filtro, setFiltro] = useState(-1);
  const [tiposProducto, setTiposProductos] = useState([]);

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
      .get("http://localhost:3000/api/productos/obtieneTiposDeProducto")
      .then((result) => {
        let resultado = result.data.data;
        setTiposProductos(resultado);
        console.log(resultado);
      })
      .catch((error) => {
        console.log(error);
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
      });
  }, []);

  return (
    <>
        <Header />
       
        <div class="container-fluid ">
        <div class="row">
  
          <div class="col-lg-12 center"><br/>
<p class="descripcion" >Elige tus productos</p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-1">
            <p></p>
          </div>
          <div class="col-lg-2">
          <button class="boton_estandar" onClick={() => setFiltro(obtieneIDtipoProducto("Bebidas"))}>
            Bebidas
          </button>
          </div>
          <div class="col-lg-2">

          <button class="boton_estandar"  onClick={() => setFiltro(obtieneIDtipoProducto("Comida"))}>
            Comida
          </button>
          </div>
          <div class="col-lg-2">

          <button class="boton_estandar" 
            onClick={() => setFiltro(obtieneIDtipoProducto("Merchandise"))}
          >
            Merchandise
          </button>
          </div>
          <div class="col-lg-2">

          <button class="boton_estandar"  onClick={() => setFiltro(-1)}>Todo</button>
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
                else if (filtro == -1) return <Producto producto={producto} />;
              })}
            </>
            
            
           
          )}
           </div>

        </div>
        </div>
         

        
          <Footer/>
    </>
  );
}
export default Home;
