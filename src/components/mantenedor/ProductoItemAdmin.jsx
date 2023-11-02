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

  const [mensajeria, setMensajeria] = useState("");

  const [ID, setID] = useState(producto.producto.ID);
  const [estadoModificar, setEstadoModificar] = useState(false);
  const [descripcion, setDescripcion] = useState(producto.producto.Descripcion);
  const [precio, setPrecio] = useState(producto.producto.precio);
  const [tipo, setTipo] = useState(producto.producto.tipoProducto);

  const [nombre, setNombre] = useState(producto.producto.Nombre);

  const [imagen, setImagen] = useState();
  const [imagenUrl, setImagenUrl] = useState();

  const THIS_URL= "http://localhost:3000/";

  function handleImagenCambio(e) {
    setImagen(e.target.files[0]);
  }


  const validaPrecio = (precio) => {
    setMensajeria("");
    const patternPrecio = /^[0-9]+([.][0-9]+)?$/;
    if (patternPrecio.test(precio)) {
      console.log("precio valido " + precio);
      return true;
    } else {
      console.log("precio no valido " + precio);
      setMensajeria("Precio no valido");
      return false;
    }
  };

  const validaTipo = (tipo) => {
    setMensajeria("");
    if (tipo.trim() == "") { 
      setMensajeria("Debe seleccionar tipo de producto");
      return false;
    } else return true;
  };
 
  function handleEliminar() {
    setMensajeria("");
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
    setMensajeria("");
    console.log("estadomodificar:" + estadoModificar);
    setEstadoModificar(!estadoModificar);
  };
  const handleValidarModificacion = () => {
    setMensajeria("");
    console.log("validarModificacion");
  };

  const handleValidar = (e) => {
    setMensajeria("");
    e.preventDefault();
8
    if(validaPrecio() && validaTipo()){
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
        setMensajeria("Error al modificar");
      });
    }
  };

  function handleChangeNombre(value) {
    setMensajeria("");
    setNombre(value);
    console.log("pasa por handlechangenombre "+mensajeria);
  }

  return (
    <div class="row listado"> 
      <p class="texto_nombre">{producto.producto.Nombre}</p>
      <div class="alert alert-primary popup" role="danger" id="popup_mensajeria" hidden={mensajeria==''?true:false}>
      {mensajeria}
   
    </div>
      
      
      <div class="col-lg-4">{producto.producto.urlFoto?<img  class="imagen_producto" src={producto.producto.urlFoto}></img>:null}</div>
    <div class="col-lg-1"></div>
      <div class="col-lg-5">
    
        <p class="texto_descripcion">{producto.producto.Descripcion}</p>
        <p class="texto_descripcion">Precio: {producto.producto.precio} €</p>
        <p class="texto_descripcion">  Tipo:{" "}
        {
          tiposProducto.find(
            (tipos) => tipos.ID == producto.producto.tipoProducto
          ).Nombre
        }</p>
          <button class="boton_estandar" onClick={handleEliminar}>Eliminar</button>
         {!estadoModificar?<button class="boton_estandar" onClick={handleModificar}>Modificar</button>:null}

      
      </div>
      <div>
        
      </div>

      {estadoModificar ? (
        
          <form onSubmit={handleValidar}>
            <div class="col-lg-1"> 
            <label htmlFor="nombre">Nombre:</label>
            </div>
            <div class="col-lg-6"> 
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setMensajeria("");
              }}
            ></input>
            </div>
            <div class="col-lg-1"> 
            <label htmlFor="precio">Precio:</label></div>
            <div class="col-lg-5"> 
            <input
              type="text"
              value={precio}
              onChange={(e) => {
                setPrecio(e.target.value);
                setMensajeria("");
              }}
            ></input></div>
            
            <div class="col-lg-1">

            <label htmlFor="tipo">Tipo:</label>
            </div>
            <div class="col-lg-11">
            <select
              id="tipoProducto "
              onChange={(e) => {
                setMensajeria("");
                setTipo(e.target.value);
                validaTipo(e.target.value);
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
            <div class="col-lg-1"> 
            <label htmlFor="descripcion">Descripcion:</label>
            </div>
            <div class="col-lg-11"> 
            <input
              type="text"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                setMensajeria("");
              }}
            ></input>
            </div>

            <div class="col-lg-1"> 
            <label htmlFor="imagen">Imagen</label></div>
            <div class="col-lg-11"> 
            <input class="boton_estandar_imagen"
              type="file"
              name="imagen"
              id="iamgen"
              accept="image/*"
              onChange={handleImagenCambio}
            /></div>
            <div clas="col-lg-1">
            <input class="boton_estandar" type="submit" value="Confirmar" />
            {estadoModificar ? (
          <button class="boton_estandar"  onClick={handleModificar}>
            Anular
          </button>
        ) : null}
        </div>
          </form>
      
      ) : null}

      <div>
      

      </div>
    </div>
  );
}
export default ProductoItemAdmin;
