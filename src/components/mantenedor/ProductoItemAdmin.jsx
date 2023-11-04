/*
Funcinalidad principal ProductoItemAdmin:

solo disponible en  modo administrador 
permite
elminar o modificar producto
*/
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexto/Context";
import { useContext } from "react";

function ProductoItemAdmin(producto) {
/** variables y funciones globales utilizadas del contexto  */
  const { URL_PATH_API, tiposProducto, listado, setListado } = useContext(Context);
/** define mensaje de resultado de alguna operacion para ser desplegado en pantalla */
  const [setMensajeria] = useState("");
/** almacena ID  de producto */
  const [ID] = useState(producto.producto.ID);
  /**flag de estaedo para determinar si esta modificando un producto  */
  const [estadoModificar, setEstadoModificar] = useState(false);
  /** almacena descripcion de producto pasado por parametro */
  const [descripcion, setDescripcion] = useState(producto.producto.Descripcion);
 /** almacena precio de producto pasado por parametro */
  const [precio, setPrecio] = useState(producto.producto.precio);
  /** almacena tipo de producto pasado por parametro */
  const [tipo, setTipo] = useState(producto.producto.tipoProducto);
  /** almacena nombre de producto pasado por parametro */
  const [nombre, setNombre] = useState(producto.producto.Nombre);
  /** almacena imagen de producto */
  const [imagen, setImagen] = useState();
  /** mensajeria de resultado de operacion para despliege sobre el producto*/
  const [mensajeriaLocal, setMensajeriaLocal] = useState(""); 
/** almacena archivo subido en variable imagen */
  function handleImagenCambio(e) {
    setImagen(e.target.files[0]);
  } 
/** valida formulario modificacion */
  function valida(){

    setMensajeriaLocal("");    
    if(imagen==null){
      setMensajeriaLocal("Debe ingresar imagen");
      return false;
    }
    const evalueNombre = /^[a-zA-Z0-9 %]{2,20}$/; //2 a 20 carcteres
    const evalueDesc = /^[a-zA-Z0-9 %]{2,50}$/; //2 a 20 carcteres
     
    if (!evalueNombre.test(nombre)) {
      setMensajeriaLocal(
        "Debe ingresar un nombre valido (3 a 20 caracters maximo)"
      );
      return false;
    }  

    if (!evalueDesc.test(descripcion)) {
      setMensajeriaLocal(
        "Debe ingresar descripcion valida (3 a 20 caracters maximo)"
      );
      return false;
    }  

    if (tipo==undefined) {      
      setMensajeriaLocal("Debe seleccionar tipo de producto");
      return false;
    }

    let tipovalido = false;
    tiposProducto.map(item=>
      {
        if(item.ID==tipo) {
      tipovalido = true;
      
    }
    });
    
    if(!tipovalido){
      setMensajeriaLocal("Debe seleccionar tipo de producto");
      return false;
    }
    return true;

  }

  /** valida formato de precio */
  const validaPrecio = (precio) => {
    setMensajeriaLocal("");
    const patternPrecio = /^[0-9]+([.][0-9]+)?$/;
    if (patternPrecio.test(precio)) {
      console.log("precio valido " + precio);
      return true;
    } else {
      console.log("precio no valido " + precio);
      setMensajeriaLocal("Precio no valido");
      return false;
    }
  };

  /** valida tipo de producto */

  const validaTipo = (tipo) => {
    setMensajeriaLocal("");
    if (tipo.trim() == "") { 
      setMensajeriaLocal("Debe seleccionar tipo de producto");
      return false;
    } else return true;
  };
 
  /** funcion que permite eliminar un producto */
  function handleEliminar() {    
    setMensajeriaLocal("");    

    if (confirm("Está seguro que quiere eliminar este producto?")) {
      console.log("ID A ELIMINAR ES :" + ID);

      axios
        .delete(URL_PATH_API+"/api/productos/producto/" + ID)
        .then((data) => {
          console.log("invoko a api");
          const status = data.data.status;
          if (status == 0) {                      
            setMensajeria("Producto eliminado correctamente");
            //hay que eliminar producto del array de producitos en state de listado
            
           setListado(oldValues => {
            return oldValues.filter(item => item.ID !== ID)
          })

            
          } else {            
            setMensajeria("Error al eliminar producto");
          }
        })
        .catch((error) => {
          console.log(error);          
          setMensajeria("error al eliminar producto");
        });
    }else{    
      setMensajeria("");
  }
  }
  /** modifica flag de permite mostrar o no el formulario de modificacion */
  const handleModificar = () => {
    setMensajeriaLocal("");
    console.log("estadomodificar:" + estadoModificar);
    setEstadoModificar(!estadoModificar);
  };

  /** Valida formulario  */
  const handleValidar = (e) => {
    console.log("valida al modificar");
    setMensajeriaLocal(""); 
    e.preventDefault();

    if(validaPrecio(precio) && valida()){
    console.log("handleValidar");
    console.log("tipo producto es " + tipo);

    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("tipoProducto", tipo);
    formData.append("precio", precio);

    //LLAMAR APi put para actualizar
    axios
      .put(URL_PATH_API+"/api/productos/producto/" + ID, formData)
      .then((data) => {
        const status = data.data.status;
        if (status == 0) {          

          setMensajeria("Modificado Correctamente");
          setMensajeriaLocal("");
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

  return (
    <div class="row listado"> 
      <p class="texto_nombre">{producto.producto.Nombre}</p>
      <div class="alert alert-primary popup" role="danger" id="popup_mensajeria" hidden={mensajeriaLocal==''?true:false}>
      {mensajeriaLocal}
   
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
        <div class="container ">
        
          <form onSubmit={handleValidar}>
            <div class="row admin_crear">
            <div class="col-lg-2"> 
            <label htmlFor="nombre">Nombre:</label>
            </div>
            <div class="col-lg-5"> 
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setMensajeria("");
                setMensajeriaLocal("");
              }}
            ></input>
            </div>
            </div>
            <div class="row admin_crear">
            <div class="col-lg-2"> 
            <label htmlFor="precio">Precio:</label></div>
            <div class="col-lg-2"> 
            <input
              type="text"
              value={precio}
              onChange={(e) => {
                setPrecio(e.target.value);
                setMensajeria("");
                setMensajeriaLocal("");
              }}
            ></input></div>
            </div>
            <div class="row admin_crear" >
            <div class="col-lg-2">
            <label htmlFor="tipo">Tipo:</label>
            </div>
            <div class="col-lg-2">
            <select
              id="tipoProducto "
              onChange={(e) => {
                setMensajeria("");
                setTipo(e.target.value);
                validaTipo(e.target.value);
                setMensajeriaLocal("");
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
            <div class="row admin_crear" >
            <div class="col-lg-2"> 
            <label htmlFor="descripcion">Descripcion:</label>
            </div>
            <div class="col-lg-10"> 
            <input
              type="text"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                setMensajeria("");
                setMensajeriaLocal("");
              }}
            ></input>
            </div>
            </div>
            <div class="row admin_crear" >
            <div class="col-lg-2"> 
            <label htmlFor="imagen">Imagen</label></div>
            <div class="col-lg-4"> 
            <input class="boton_estandar_imagen"
              type="file"
              name="imagen"
              id="imagen"
              accept="image/*"
              onChange={handleImagenCambio}
            /></div>
            </div>
            <div class="row admin_crear" >
            <div clas="col-lg-3"></div>
            <div clas="col-lg-3">
            <input class="boton_estandar" type="submit" value="Confirmar" />
            <button class="boton_estandar" onClick={()=>{setEstadoModificar(false)}} >Volver</button>

            
        </div>
        </div>
          </form>
          </div>
      
      ) : null}

      <div>
      

      </div>
    </div>
  );
}
export default ProductoItemAdmin;
