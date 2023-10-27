import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductoAdmin from "./ProductoAdmin";
import Header from "../productos/vistas/Header";
import { Context } from "../contexto/Context";
import { useContext } from "react";

function AdminProductos() {
  const [listado, setListado] = useState([]);
  const [visibleCrear, setVisibleCrear] = useState(false);
 
  const [formNombre, setFormNombre] = useState("");
  const [formDescripcion, setFormDescripcion] = useState("");
  const [formPrecio, setFormPrecio] = useState("");
  const [formTipoProducto, setFormTipoProducto] = useState('');
  const { tiposProducto}=useContext(Context);

  const navigate = useNavigate();

  function handleCrear(e) {
    e.preventDefault();
  
    const nombre = formNombre;
    const tipo = formTipoProducto;
    const descripcion = formDescripcion;
    const precio = formPrecio; 
   

    if(validaPrecio(precio) && validaTipo(tipo))
    {
        //invoka api crear producto
        axios.post("http://localhost:3000/api/productos/producto",
        {
            nombre:nombre,
            descripcion:descripcion,
            tipoProducto:tipo,
            precio:precio,
            descuento:0
        }).
        then((data)=>{
            console.log("llegó al request!");

            if(data.data.status==0){
                alert("producto creado correctamente");
                navigate('/adminProductos');
            }
            else{
                alert("error al ingresar producto en base datos");
            }
        }).catch((error)=>{
            console.log("error al registrar producto");
        });

    }
  }

  const validaPrecio =(precio)=>
  {
    const patternPrecio =/^[0-9]+([.][0-9]+)?$/;
    if(patternPrecio.test(precio)){
        console.log("precio valido "+precio);
        return true;
    }
    else{ 
        console.log("precio no valido "+precio);
        return false;
    }
  }

  const validaTipo =(tipo)=>
  {
    const patternPrecio =/^[0-9]{0,2}$/;
    console.log(tipo);
    if(patternPrecio.test(tipo)){
        console.log("tipo valido "+tipo);
        return true;
    }
    else{ 
        console.log("tipo no valido "+tipo);
        return false;
    }
  }

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
    <><Header />
      <div>
        <p>Lista de productos</p>
        <button
          onClick={() => {
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
          <input type="text" id="nombre" 
          onChange={(e)=>{setFormNombre(e.target.value)}}></input>
          <br />

          <label htmlFor="descripcion">Descripcion:</label>
          <input type="text" id="descripcion" onChange={(e)=>{setFormDescripcion(e.target.value)}}>
           
          </input>
          <br />

          <label htmlFor="precio">Precio:</label>
          <input type="text" id="precio" onChange={(e)=>{setFormPrecio(e.target.value);validaPrecio(e.target.value)}}></input>
          <br />
        <label htmlFor="tipo">Tipo:</label>
          <select id="tipoProducto " onChange={(e)=>{setFormTipoProducto(e.target.value);validaTipo(e.target.value)}}>
            {tiposProducto.map((item) => {
              console.log(item);
              return (
                <option key={item.ID} value={item.ID}>
                  {item.Nombre}
                </option>
              );
            })}
          </select>

          <input type="submit" value="Crear" />
        </form>
      </div>


















      <div hidden={visibleCrear}>
        {listado.length == 0 ? (
          <p>No hay productos</p>
        ) : (
          <ul>
            {listado.map((producto) => {
              return (
                <li key={producto.ID}>
                  <ProductoAdmin producto={producto} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
export default AdminProductos;

// {/* <button onClick={setVisibleCrear(true)} >Crear</button><br/> */}
