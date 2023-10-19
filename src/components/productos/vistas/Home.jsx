import React from "react";
// import ReactDOM} from "react-dom";
import {useState, useEffect} from 'react';
import Cookies from 'js-cookies';
import Header from "./Header";
import Footer from "../Footer";
import axios from "axios";
import Producto from "./Producto";
function Home()
{
     const [sesion, setSesion] = useState();
    // const [nombre, setNombre] = useState();
    // const [apellidos, setApellidos] = useState();
    // const [tipoUsuario, setTipoUsuario] = useState();
    const [listado, setListado] = useState([]);
    const [status, setStatus] = useState(2);
    const [filtro, setFiltro] = useState(-1);
    const [tiposProducto, setTiposProductos] = useState([]);
  function obtieneIDtipoProducto(prod)
   {
    console.log("obtieneIDtipoProducto");
    for(let i=0;i<tiposProducto.length;i++)
    {
      let nombre= tiposProducto[i].Nombre;
      if(prod.toString().toUpperCase()==nombre.toUpperCase())
      {
        return tiposProducto[i].ID;
      }
    }
    console.log("no encontrado");
    return -1;
   }
    


  useEffect(()=>
  {
    console.log('inicia HOME useeffect');
    const sessionGuardada = Cookies.getItem('sesion') !=null?JSON.parse(Cookies.getItem('sesion')):null;
    if(sessionGuardada)
    {
      setSesion(sessionGuardada);
      console.log('setea sesion guardada');
      
    }

    axios.get('http://localhost:3000/api/productos/obtieneTiposDeProducto')
    .then((result)=>{
      let resultado = result.data.data;
      setTiposProductos(resultado);
      console.log(resultado);
       }).catch((error)=>{
      console.log(error);
    });

    
    axios.get('http://localhost:3000/api/productos/obtieneListaProductos').
    then((result)=>{
      console.log("ok al conectar api productos");
      console.log(result.data.data);
      console.log(result.data.data.result);
      let resultado =  result.data.data.result;
      setListado(resultado);
      setStatus(result.data.status);
      console.log(status);
      console.log(listado);
      console.log(typeof(listado));
      console.log(listado.length);
      setFiltro(-1);

    }).catch((error)=>    
    {
      console.log("error:"+error);
    });
    
  }
    
    ,[]);

   

    return(
        <>
        <p>Home con sesion iniciada</p>
        <Header/>
        <></>
        <div>

        <button onClick={()=>setFiltro(obtieneIDtipoProducto('Bebidas'))}>Bebidas</button>

        <button onClick={()=>setFiltro(obtieneIDtipoProducto('Comida'))}>Comida</button>

        <button onClick={()=>setFiltro(obtieneIDtipoProducto('Merchandise'))}>Merchandise</button>

        <button onClick={()=>setFiltro(-1)}>All</button>

        </div>
        <div>
          <p>Listado de productos</p>
          

          {
        listado.length==0?(
            <p>No hay productos</p>
        ):
        (
            
            <ul>
                { listado.map((producto)=>
                {
                  if(producto.tipoProducto==filtro)
                   return  <Producto producto={producto} />
                   else if(filtro==-1)
                   return <Producto producto={producto} />

                })
                }
            </ul>


        )
    }

        </div>

        <div>
          <p></p>
        </div>



        <Footer />
        </>
    )

}
export default Home;