import React from "react";
import { useEffect, useContext } from "react";
// import { Context } from "../../contexto/Contexto";
import { Pedido } from "../../../class/Pedido";

import ItemProducto from "./ItemProducto";
import { Context } from "../../contexto/Context";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { ItemPedido } from "../../../class/ItemPedido";
import { useNavigate } from "react-router-dom";
// return <ItemProducto item={item}></ItemProducto>

function VerPedido(){

    const { pedido, sesion, setPedido}=useContext(Context);
    const navigate = useNavigate();
    
    console.timeLog("pedido:"+pedido);


    function handleRealizarPedido(){


        console.log("handleRealizarPedido");
        console.log("sesion es "+sesion);
        console.log("pedido: "+pedido);

        axios.post("http://localhost:3000/api/pedidos/crearPedido",        
        {
        username:sesion.username, 
        tipoUsuario:sesion.tipoUsuario,
        cantidadProductos:pedido.cantidadProductos, 
        total:pedido.total,
        items:pedido.items}).then((res)=>
        {
            console.log("respuesta crear pedido "+res);
            if(res.data.status==0){
                console.log('PEDIDO INGRESADO OK');
                }
          alert("su id pedido es "+res.data.idPedido);
          setPedido(new Pedido());
          navigate("/");

        }

        ).catch((error)=>
        {
            console.log(error);
        }
        );


        //validar todo lo validabel
        //luego llamar a axios invokar api de ingresar pedido
        console.log('fin registrar pedido');
    };


    return(<>
    < Header />
    <div>PAGINA VER PEDIDO</div>
    {pedido.items.length>0?
    <div>
        <ul>
 {pedido.items.map(item=>
        {console.log(item);
            return <ItemProducto ID={item.ID} cantidad={item.cantidad} nombre={item.nombre} total={item.total} ></ItemProducto>
        
        })}
    </ul>
    
    <button onClick={handleRealizarPedido} >Confirmar pedido</button>          
 

    </div>:

 


    <div>


        <p>No ha seleccionado productos</p></div>
        }
        <Footer />
    
    </>)

}

export default VerPedido;