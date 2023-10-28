import React from "react";
import { useState } from "react";
import Producto from "../productos/vistas/Producto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexto/Context";
import { useContext } from "react";

function ProductoItemAdmin(producto) {
  const navigate = useNavigate();
  const { tiposProducto, listado, setListado } = useContext(Context);

  const [ID, setID] = useState(producto.producto.ID);
  const [estadoModificar, setEstadoModificar] = useState(false);
  const [descripcion, setDescripcion] = useState(producto.producto.Descripcion);
  const [precio, setPrecio] = useState(producto.producto.precio);
  const [tipo, setTipo] = useState(producto.producto.tipoProducto);

  const [nombre, setNombre] = useState(producto.producto.Nombre);

  const [imagen, setImagen] = useState();
  const [imagenUrl, setImagenUrl] = useState();

  function handleImagenCambio(e) {
    setImagen(e.target.files[0]);
  }

  // setNombre(producto.producto.Nombre);

  function handleEliminar() {
    const res = alert("Está seguro que quiere eliminar este producto?");
    console.log(res);

    if (true) {
      console.log("ID A ELIMINAR ES :" + ID);

      axios
        .delete("http://localhost:3000/api/productos/producto/" + ID)
        .then((data) => {
          console.log("invoko a api");
          const status = data.data.status;
          if (status == 0) {
            alert("Producto eliminado correctamente");
            //hay que eliminar producto del array de producitos en state de listado

            setListado(listado.filter((item) => item.ID != ID));

            //navigate("/adminProductos");
          } else {
            alert("Error al eliminar producto de la base datos");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("error al eliminar producto");
        });
    }
  }

  const handleModificar = () => {
    console.log("estadomodificar:" + estadoModificar);
    setEstadoModificar(!estadoModificar);
  };
  const handleValidarModificacion = () => {
    console.log("validarModificacion");
  };

  const handleValidar = (e) => {
    e.preventDefault();
    console.log("handleValidar");
    console.log("tipo producto es " + tipo);

    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("tipoProducto", tipo);
    formData.append("precio", precio);
    formData.append("descuento", 0);

    //LLAMAR APi put para actualizar
    axios
      .put("http://localhost:3000/api/productos/producto/" + ID, formData)
      .then((data) => {
        const status = data.data.status;
        if (status == 0) {
          alert("modificado correctamente");
          let actual = listado;
          const index = listado.findIndex(x=>x.ID === ID);
          
          actual[index].Descripcion=descripcion;
          actual[index].Nombre=nombre;
          actual[index].tipoProducto = tipo;
          actual[index].precio = precio;
          setListado(actual);
          setEstadoModificar(!estadoModificar);
          console.log("find e modificar");

        } else {
          alert("error al modificar");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("error al modificar");
      });
  };

  function handleChangeNombre(value) {
    setNombre(value);
  }

  return (
    <div>
      <p></p>
      {estadoModificar ? <h1>Welcome to CodeSandBox</h1> : null}

      <div>Nombre: {producto.producto.Nombre}</div>
      <div>foto: {producto.urlFoto}</div>
      <div>Descripcion: {producto.producto.Descripcion}</div>
      <div>Precio: {producto.producto.precio}</div>
      <div>
        Tipo:{" "}
        {
          tiposProducto.find(
            (tipos) => tipos.ID == producto.producto.tipoProducto
          ).Nombre
        }
      </div>

      {estadoModificar ? (
        <div>
          <form onSubmit={handleValidar}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            ></input>

            <label htmlFor="descripcion">Descripcion:</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            ></input>

            <label htmlFor="precio">Precio:</label>
            <input
              type="text"
              value={precio}
              onChange={(e) => {
                setPrecio(e.target.value);
              }}
            ></input>

            <label htmlFor="tipo">Tipo:</label>
            <select
              id="tipoProducto "
              onChange={(e) => {
                setTipo(e.target.value);
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

            <br />
            <label htmlFor="imagen">Imagen</label>
            <input
              type="file"
              name="imagen"
              id="iamgen"
              accept="image/*"
              onChange={handleImagenCambio}
            />
            <input type="submit" value="Confirmar" />
          </form>
        </div>
      ) : null}

      <div>
        <button onClick={handleEliminar}>Eliminar</button>
        <button onClick={handleModificar}>Modificar</button>
        {estadoModificar ? (
          <button onClick={handleValidarModificacion}>
            Confirmar modificacion
          </button>
        ) : null}
      </div>
    </div>
  );
}
export default ProductoItemAdmin;
