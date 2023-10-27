import React from "react";
import { useState, useEffect,useContext } from "react";
import Header from "./Header";
import Cookies from "js-cookies";

import axios from "axios";
import { Context } from "../../contexto/Context";
import { useNavigate } from "react-router-dom";
import PedidoDetalle from "./PedidoDetalle";

function MisPedidos() {
  // const { pedido, sesion, setPedido } = useContext(Context);
  const navigate = useNavigate();
  const [listado, setListado] = useState([]);


  useEffect(() => {
    setListado([]);
    const sesion = Cookies.getItem("sesion");
    if (sesion != null || sesion != undefined) {
      //Si hay sesion valida entonces
      const username = JSON.parse(sesion).username;
      console.log("username para el request es " + username);
      if (username != null || username != undefined) {
        console.log("llamar al a api de listado de pedidos");
        axios
          .post("http://localhost:3000/api/pedidos/listaPedidos", {
            username: username,
          })
          .then((result) => {
            console.log("lista de pedidos ");
            let resultado = Array.from(result.data.pedidos);
            resultado.forEach((item) => {
              listado.push(item);
            });
            setListado(listado);
            console.log(listado);
            console.log(listado.length);
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

  // useState(() => {
  //   console.log("cambio la mierda de listado!");
  // }, [listado]);

  return (
    <div>
      <Header />

      <div>
        <h1>Mis Pedidos</h1>
      </div>
      <div>
        <p>Listado de productos</p>
        {listado == undefined ? (
          <p>No hay productos</p>
        ) : (
          <div>
            {listado.map((producto) => {
              return <div key={producto.ID}><PedidoDetalle detalle={producto} ID_Pedido={producto.ID}  /></div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default MisPedidos;
