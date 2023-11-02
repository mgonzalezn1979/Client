import React from "react";
import iconoHome from "../assets/imagenes/home.png";
import cesta from "../assets/imagenes/cesta.png";
import pedidos from "../assets/imagenes/pedidos.png";
import logo from "../assets/imagenes/logo.png";
import { useNavigate } from "react-router-dom";

function BannerSuperior() {
    const navigate = useNavigate();
  return (
    <>
      <div class="container capa_opacidad_titulo">
        <div class="row">        
     <div class="alert alert-warning col-lg-12" role="alert">Cafeteria SimuLatte
   <img src={logo} class="icono"/>&nbsp;&nbsp;
   <button class="boton_estandar" onClick={()=>{navigate('/quienesSomos')}}>Conócenos</button>
    </div>
      </div>
      </div>
    </>
  );
}

export default BannerSuperior;
