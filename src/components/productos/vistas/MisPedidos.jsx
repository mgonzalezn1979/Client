import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { useState, useEffect } from "react";
import Cookies from "js-cookies";
import Home from "./Home";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../contexto/Context";
import { useNavigate } from "react-router-dom";

function MisPedidos() {
  const { pedido, sesion, setPedido } = useContext(Context);
  const navigate = useNavigate();
  const [listado, setListado] = useState([]);

  useEffect(() => {
    const sesion = Cookies.getItem("sesion");
    if (sesion != null || sesion != undefined) {
        //Si hay sesion valida entonces
      const username = JSON.parse(sesion).username;
      console.log("username para el request es " + username);
      if (username != null || username != undefined) {
        console.log("llamar al a api de listado de pedidos");
        axios
          .post("http://localhost:3000/api/pedidos/listaPedidos", 
            { username: username} 
          )
          .then((result) => {
            console.log("lista de pedidos ");             
             let resultado = Array.from(result.data.pedidos);  
            //  let datos = Array.from(resultado);

            resultado.forEach(item=>
                {
                    listado.push(item);
                });

            //listado.push(resultado[0]);
            setListado(listado);
            
              
             //  setListado(resultado); 
            // resultado.map((item)=>{
            //     console.log(item.ID);   
            //     setListado([...listado, item]);
                           
            // }) ;
       
            //   CONSOLE.log
            //   console.log(datos);
              console.log(listado);    
            

          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("no hay sesion activa, redirige a home");
        navigate("/");
      }
    }
  }, []);

  function handleVerPedido(idPedido)
  {
    console.log("handleVerPedido "+ idPedido);
  }

  useState(()=>{

    console.log("cambio la mierda de listado!");
  },[listado]);

  return (
    <div>
      <Header />

      <div>
        <h1>Mis Pedidos</h1>

      </div>
     <div>
     <p>Listado de productos</p>

{listado==undefined? (
  <p>No hay productos</p>
) : (
  <ul>
    {listado.map((producto) => {      
         return <><li key={producto.ID} >FECHA:{producto.Fecha} TOTAL:{producto.Total}</li>
         <button onClick={()=>handleVerPedido(producto.ID)} >Ver</button></>;

    })}
  </ul>
)}



        </div>
      
       
    </div>
  );
}
export default MisPedidos;
