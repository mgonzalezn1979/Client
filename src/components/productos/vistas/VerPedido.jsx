import React from "react";
import { useEffect, useContext } from "react";
import { Pedido } from "../../../class/Pedido";
import ItemProducto from "./ItemProducto";
import { Context } from "../../contexto/Context";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerPedido(){

    const { pedido, sesion, setPedido, setFlagCreaPedido,flagCreaPedido}=useContext(Context);
    const navigate = useNavigate();    
    console.log("pedido:"+pedido);
    console.log("flag creaModifica=false"+flagCreaPedido);

    const handleModificarPedido =()=>{
        console.log("modificar pedido");
       
        axios.put("http://localhost:3000/api/pedidos/pedido/"+pedido.ID,        
        {
        username:sesion.username, 
        tipoUsuario:sesion.tipoUsuario,
        cantidadProductos:pedido.cantidadProductos, 
        total:pedido.total,
        items:pedido.items}).then((res)=>
        {
            console.log("respuesta crear pedido "+res);
            if(res.data.status==0){
                console.log('Modificado OK');
                alert("Pedido modificado ok");
                setPedido(new Pedido());
                setFlagCreaPedido(true);
                navigate("/");
                }
                else{
                    alert("error al modificar");
                }
        
        }

        ).catch((error)=>
        {
            console.log(error);
        });       
        console.log('fin registrar pedido');




    }

    function handleRealizarPedido(){

        console.log("handleRealizarPedido");
        console.log("sesion es "+sesion);
        console.log("pedido: "+pedido);

        axios.post("http://localhost:3000/api/pedidos/pedido",        
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
        });       
        console.log('fin registrar pedido');
    };


    return(<>
    < Header />
    <h2>PAGINA VER PEDIDO </h2>
    
    {pedido.items.length>0?
    <div>
        <ul>
 {pedido.items.map(item=>
        {console.log(item);
            return <ItemProducto ID={item.ID} cantidad={item.cantidad} nombre={item.nombre} total={item.total} ></ItemProducto>
        
        })}
    </ul>
    
    {flagCreaPedido?<button onClick={handleRealizarPedido} >Confirmar pedido</button> 
    :<button onClick={handleModificarPedido}>Confirmar modificacion</button> 
    }        
    </div>:
    <div>
        <p>No ha seleccionado productos</p></div>
        }
        <Footer />
    
    </>)

}

export default VerPedido;