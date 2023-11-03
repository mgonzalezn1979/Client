/**Funcionalidad principal AdminProductos:
 * Permite CRUD de productos solo para usuario administrador
 * / */

import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductoItemAdmin from "./ProductoItemAdmin";
import Header from "../Header";
import { Context } from "../contexto/Context";
import Popup from "../mensajeria/Popup";

function AdminProductos() {
  /**flag de estados para despliegue o no de componentes segun si se esta creando producto o no */
  const [visibleCrear, setVisibleCrear] = useState(false);
  /** almacena el nombre de producto */
  const [formNombre, setFormNombre] = useState("");
  /** almacena descripcion de producto  */
  const [formDescripcion, setFormDescripcion] = useState("");
  /** almacena precio de producto  */
  const [formPrecio, setFormPrecio] = useState("");
  /** almacena tipo de producto*/
  const [formTipoProducto, setFormTipoProducto] = useState("");
  /** variables globales necesirias del contexto */
  const { URL_PATH_API, tiposProducto, listado, setListado, setMensajeria, mensajeria } =
    useContext(Context);
 
 /** almacena imagen de producto */
  const [imagen, setImagen] = useState();
/** actualiza variable que almacena imagen al agregar mediante el explorador web */
  function handleImagenCambio(e) {
    setMensajeria("");
    setImagen(e.target.files[0]);
  }
/** valida formulario al crear */
  function valida() {
    if (imagen == null) {
      setMensajeria("Debe ingresar imagen");
      return false;
    }
/** expresiones regulares para validacion de nombre  */
    const evalueNombre = /^[a-zA-Z0-9 %]{2,20}$/; //2 a 20 carcteres
    if (!evalueNombre.test(formNombre)) {
      setMensajeria("Debe ingresar un nombre valido (3 a 20 caracters maximo)");
      return false;
    }
    /** expresiones regulares para evaluacion de descripcion de producto */
    const evalueDes = /^[a-zA-Z0-9 %]{2,50}$/; //2 a 50 carcteres

    if (!evalueDes.test(formDescripcion)) {
      setMensajeria(
        "Debe ingresar descripcion valido (3 a 50 caracters maximo)"
      );
      return false;
    }

    if (formTipoProducto == undefined || formTipoProducto.trim() == "") {
      setMensajeria("Debe seleccionar tipo de producto");
      return false;
    }

    let tipovalido = false;
    tiposProducto.map((tipo) => {
      if (tipo.ID == formTipoProducto) {
        tipovalido = true;
      }
    });

    if (!tipovalido) {
      setMensajeria("Debe seleccionar tipo de producto");
      return false;
    }
    return true;
  }

  /** permite crear producto invocando la api  */
  function handleCrear(e) {
    setMensajeria("");
    e.preventDefault();

    if (validaPrecio(formPrecio) && valida()) {
      const nombre = formNombre;
      const tipo = formTipoProducto;
      const descripcion = formDescripcion;
      const precio = formPrecio;

      const formData = new FormData();
      formData.append("imagen", imagen);
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("tipoProducto", tipo);
      formData.append("precio", precio);
      setMensajeria("");
      
      axios
        .post(URL_PATH_API+"/api/productos/producto", formData)
        .then((data) => {
          console.log("llegó al request!");
          if (data.data.status == 0) {
            setMensajeria("Producto creado correctamente");
            const nuevo = {
              ID: data.data.idPedido,
              Nombre: nombre,
              Descripcion: descripcion,
              urlFoto: "",
              tipoProducto: tipo,
              precio: precio,
            };

            setFormNombre("");
            setFormDescripcion("");
            setFormPrecio(0);
            setFormTipoProducto(tiposProducto[0].ID);
            setVisibleCrear(!visibleCrear);
            setListado((old) => [...old, nuevo]);
           
          } else {
            alert("error al ingresar producto en base datos");
            setMensajeria("error al ingresar producto en base datos");
          }
        })
        .catch((error) => {
          console.log(error);
          setMensajeria("error al ingresar producto");
        });
    }
  }
/** valid formato de precio ingresado */
  const validaPrecio = (precio) => {
    setMensajeria("");
    const patternPrecio = /^[0-9]+([.][0-9]+)?$/;
    if (patternPrecio.test(precio)) {
      console.log("precio valido " + precio);
      try {
        if (parseFloat(precio) > 0) {
          return true;
        } else {
          setMensajeria("Debe ingresar precio valido");
          return false;
        }
      } catch (error) {
        setMensajeria("Debe ingresar precio valido");
        return false;
      }
      return true;
    } else {
      console.log("precio no valido " + precio);
      setMensajeria(
        "precio no valido " + precio + " (debe incluir 2 decimales)"
      );
      return false;
    }
  };

  /** Llama api de listdo de productos */
  function actualizaListado()
  {
    axios
    .get(URL_PATH_API+"/api/productos/obtieneListaProductos")
    .then((result) => {
      console.log("ok al conectar api productos");
      console.log(result.data.data.result);
      let resultado = result.data.data.result;
      setListado(resultado);
    })
    .catch((error) => {
      console.log("error:" + error);
    });

  }

  useEffect(() => {
   actualizaListado();
  }, []);

  return (
    <>
      <Header />
      <Popup mensaje={mensajeria} />
      <div class="container box">
        <div class="row">
          <div class="alert alert-danger" role="alert">
            <center>
              {" "}
              <p class="fuenteGrande">Mantenedor de productos</p>
              <br />
              <p class="fuenteEstandar">
                Importante! se encuentra en sesi&oacute;n de administrador, por
                tanto cualquier modificaci&oacute;n, eliminaci&oacute;n o
                creaci&oacute;n de Productos, afectar&aacute; directamente en
                los pedidos ya creados
              </p>
            </center>
          </div>
        </div>

        <div class="row centro_horizontal">
          <button
            id="boton_estandar_admin"
            onClick={() => {
              setFormDescripcion("");
              setFormNombre("");
              setFormPrecio(0);
              setFormTipoProducto("");
              setVisibleCrear(!visibleCrear);
              setMensajeria("");
            }}
          >
            Crear
          </button>
        </div>
        <div class="row listado" hidden={!visibleCrear}>
          <center>
            <p class="fuenteGrande">Formulario crear producto</p>
          </center>
          <br />

          <form onSubmit={handleCrear}>
            <div class="row admin_crear">
              <div class="col-lg-3">
                <label htmlFor="nombre">Nombre:</label>
              </div>
              <div class="col-lg-8">
                <input
                  type="text"
                  id="nombre"
                  onChange={(e) => {
                    setMensajeria("");
                    setFormNombre(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div class="row admin_crear">
              <div class="col-lg-3">
                <label htmlFor="descripcion">Descripcion:</label>
              </div>
              <div class="col-lg-8">
                <input
                  type="text"
                  id="descripcion"
                  onChange={(e) => {
                    setMensajeria("");
                    setFormDescripcion(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div class="row admin_crear">
              <div class="col-lg-3">
                <label htmlFor="precio">Precio:</label>
              </div>
              <div class="col-lg-5 ">
                <input
                  type="text"
                  id="precio"
                  onChange={(e) => {
                    setMensajeria("");
                    setFormPrecio(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div class="row admin_crear">
              <div class="col-lg-3">
                <label htmlFor="tipo">Tipo:</label>
              </div>
              <div class="col-lg-6">
                <select
                  id="tipoProducto "
                  onChange={(e) => {
                    setMensajeria("");
                    setFormTipoProducto(e.target.value);
                  }}
                >
                  {tiposProducto.map((item) => {
                    return (
                      <option key={item.ID} value={item.ID}>
                        {item.Nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class="row admin_crear">
              <div class="col-lg-3">
                <label htmlFor="imagen">Imagen</label>
              </div>
              <div class="col-lg-8">
                <input
                  type="file"
                  name="imagen"
                  id="iamgen"
                  accept="image/*"
                  onChange={handleImagenCambio}
                />
              </div>
            </div>
            <div class="row admin_crear">
              <input class="boton_estandar" type="submit" value="Crear" />{" "}
              <button
                class="boton_estandar"
                onClick={() => {
                  setVisibleCrear(!visibleCrear);
                  setMensajeria("");
                }}
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="container" hidden={visibleCrear}>
        <div class="row">
          <div class="texto_nombre" hidden={listado.length > 0}>
            <p class="texto_descripcion">No hay productos</p>
          </div>
        </div>

        {listado.length > 0
          ? listado.map((producto) => (
              <ProductoItemAdmin key={producto.id} producto={producto} />
            ))
          : null}
      </div>
    </>
  );
}
export default AdminProductos;
// {/* <ProductoItemAdmin key={producto.id} producto={producto} /> */}
