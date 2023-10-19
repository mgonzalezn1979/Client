import React from "react";
import Header from "./Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import Cookies from 'js-cookies'

function MisPedidos()
{

    const [listado,setListado] = useState([]);
    useEffect(()=>{

        console.log('');


    },[]);



    return(<div>
        <Header />

        <div>
        <h1>Productos del pedido</h1>

        </div>
        <div>
            <Footer />

        </div>

    </div>)
}
export default Pedidos;