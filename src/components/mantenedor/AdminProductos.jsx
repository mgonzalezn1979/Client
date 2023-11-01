import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductoItemAdmin from "./ProductoItemAdmin";
import Header from "../Header";
import { Context } from "../contexto/Context";
import { useContext } from "react";

function AdminProductos() {
  const [visibleCrear, setVisibleCrear] = useState(false);
  const [formNombre, setFormNombre] = useState("");
  const [formDescripcion, setFormDescripcion] = useState("");
  const [formPrecio, setFormPrecio] = useState("");
  const [formTipoProducto, setFormTipoProducto] = useState("");
  const { tiposProducto, listado, setListado } = useContext(Context);

  const navigate = useNavigate();

  const [imagen,setImagen] = useState();
  const [imagenUrl, setImagenUrl] = useState();

  function handleImagenCambio(e)
  {
      setImagen(e.target.files[0])
  }

  function handleCrear(e) {
    e.preventDefault();

    const nombre = formNombre;
    const tipo = formTipoProducto;
    const descripcion = formDescripcion;
    const precio = formPrecio;

    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append("nombre", nombre); 
    formData.append("descripcion", descripcion);
    formData.append("tipoProducto", tipo);
    formData.append("precio", precio);
    formData.append("descuento", 0);


    if (validaPrecio(precio) && validaTipo(tipo)) {
      //invoka api crear producto
      axios
        .post("http://localhost:3000/api/productos/producto", formData)
        .then((data) => {
          console.log("llegó al request!");

          if (data.data.status == 0) {
            alert("producto creado correctamente");
            //navigate('/adminProductos');

            const nuevo = {
              ID: data.data.idPedido,
              Nombre: nombre,
              Descripcion: descripcion,
              urlFoto: "",
              tipoProducto: tipo,
              precio: precio,
              descuento: 0,
            };
            setListado((old) => [...old, nuevo]);

            setFormNombre("");
            setFormDescripcion("");
            setFormPrecio(0);
            setFormTipoProducto("");
            setVisibleCrear(!visibleCrear);
          } else {
            alert("error al ingresar producto en base datos");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("error al registrar producto");
        });
    }
  }

  const validaPrecio = (precio) => {
    const patternPrecio = /^[0-9]+([.][0-9]+)?$/;
    if (patternPrecio.test(precio)) {
      console.log("precio valido " + precio);
      return true;
    } else {
      console.log("precio no valido " + precio);
      return false;
    }
  };

  const validaTipo = (tipo) => {
    if (tipo.trim() == "") {
      alert("debe seleccionar tipo de producto");
      return false;
    } else return true;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/productos/obtieneListaProductos")
      .then((result) => {
        console.log("ok al conectar api productos");
        console.log(result.data.data.result);
        let resultado = result.data.data.result;
        setListado(resultado);
        //setStatus(result.data.status);

        //setFiltro(-1);
      })
      .catch((error) => {
        console.log("error:" + error);
      });
  }, []);

  return (
    <>
      <Header />
      <div>
        <p>Lista de productos</p>
        <button
          onClick={() => {
            setFormDescripcion("");
            setFormNombre("");
            setFormPrecio(0);
            setFormTipoProducto('1');
            setVisibleCrear(!visibleCrear);
          }}
        >
          Crear Producto
        </button>
      </div>
      <div hidden={!visibleCrear}>
        <p>Formulario crear producto</p>
        <br />
        <form onSubmit={handleCrear}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            onChange={(e) => {
              setFormNombre(e.target.value);
            }}
          ></input>
          <br />

          <label htmlFor="descripcion">Descripcion:</label>
          <input
            type="text"
            id="descripcion"
            onChange={(e) => {
              setFormDescripcion(e.target.value);
            }}
          ></input>
          <br />

          <label htmlFor="precio">Precio:</label>
          <input
            type="text"
            id="precio"
            onChange={(e) => {
              setFormPrecio(e.target.value);
              validaPrecio(e.target.value);
            }}
          ></input>
          <br />
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipoProducto "
            onChange={(e) => {
              setFormTipoProducto(e.target.value);
              validaTipo(e.target.value);
            }}
          >
            {tiposProducto.map((item) => {
              console.log(item);
              return (
                <option key={item.ID} value={item.ID}>
                  {item.Nombre}
                </option>
              );
            })}
          </select>

          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            name="imagen"
            id="iamgen"
            accept="image/*"
            onChange={handleImagenCambio}
          />

          <input type="submit" value="Crear" />
        </form>
        <button
          onClick={() => {           
            setVisibleCrear(!visibleCrear);
          }}
        >
          Volver
        </button>
      </div>
      {listado ? (
        <div hidden={visibleCrear}>
          {listado.length == 0 ? (
            <p>No hay productos</p>
          ) : (
            <ul>
              {listado.map((producto) => {
                return (
                  <li key={producto.ID}>
                    <ProductoItemAdmin producto={producto} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </>
  );
}
export default AdminProductos;

// {/* <button onClick={setVisibleCrear(true)} >Crear</button><br/> */}
