import React from "react";
import { useEffect, useContext } from "react";
import { Pedido } from "../../../class/Pedido";
import ItemProducto from "./ItemProducto";
import { Context } from "../../contexto/Context";
import Header from "../../Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerPedido(){

    const { setMensajeria, pedido, sesion, pedidoPorConfirmar, setPedidoPorConfirmar,setPedido, setFlagCreaPedido,flagCreaPedido}=useContext(Context);
    const navigate = useNavigate();   
     
    console.log("pedido:"+pedido);
    console.log("flag creaModifica=false"+flagCreaPedido);
    
    const handleAnular = ()=>{
        setMensajeria("");
        setFlagCreaPedido(true);
        setPedido(new Pedido());
        setPedidoPorConfirmar(false);
        navigate("/");
        
    }

    const handleModificarPedido =()=>{
        setMensajeria("");
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
                setMensajeria("Pedido modificado ok, ID:"+pedido.ID);
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
        setPedidoPorConfirmar(false);
    }

    function handleRealizarPedido(){
        console.log("handleRealizarPedido");
        console.log("sesion es "+sesion);
        console.log("pedido: "+pedido);
        setMensajeria("");

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
                setMensajeria("Pedido ingresado correctamente, ID:"+res.data.idPedido);
                }
           
          setPedido(new Pedido());
          setPedidoPorConfirmar(false);
          setFlagCreaPedido(true);
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
    <div class="container">
        <div class="row">
    {pedido.items.length>0?
    <div class="col-lg-12">
        
 {pedido.items.map(item=>
        {console.log(item);
            return <ItemProducto ID={item.ID} cantidad={item.cantidad} nombre={item.nombre} total={item.total} urlFoto={item.urlFoto}></ItemProducto>
        
        })}    
    
         
    </div>:
    <div>
        <p>No ha seleccionado productos</p></div>
        }
        <div class="container">
        <div class="row listado center middle">
          
                  <p class="fuenteEstandar">
                    
                    Cantidad productos: {pedido.cantidadProductos}&nbsp;
                    Total: {(Math.round(pedido.total * 100) / 100).toFixed(2)} €
                    {flagCreaPedido?<button class="boton_estandar" onClick={handleRealizarPedido} >Confirmar</button> 
    :<button class="boton_estandar" onClick={handleModificarPedido}>Confirmar</button> 
    } 
    <button class="boton_estandar" 
    onClick={handleAnular}>Anular</button> </p>             
         
       
        </div></div>
</div>
</div>
        {flagCreaPedido?<Footer />:null}
    
    </>)

}

export default VerPedido;