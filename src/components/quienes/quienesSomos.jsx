import react from "react";
import quienesImagen from "../../assets/imagenes/quienes_somos.jpg";
import { useNavigate } from "react-router-dom";
import BannerSuperior from "../BannerSuperior";

function QuienesSomos() {
  const navigate = useNavigate();
  return (
    <>
      <BannerSuperior></BannerSuperior>
      <div class="container">
        <div class="row ">
          <div class="alert alert-warning " role="alert">
            <center><p class="fuenteGrande ">Quienes somos</p><br/></center>
            <p class="fuenteChica">
              Somos tu cafeteria favorita en el centro de sevilla frente a las
              setas, nuestra web te permitir&aacute; guardar tus pedidos y ver
              nuestros productos{" "}
            </p>
          </div>

        </div>
      
        <div class="row ">
          <img src={quienesImagen} class="imagen_quienes "></img>
        </div>
      </div>
      <div class="margen_quienes_boton_inicio alert alert-success capa_opacidad_titulo " role="alert">
<p class="fuenteChica"> Para poder continuar te pediremos que te registres para que puedas iniciar sesi&oacute;n &nbsp;&nbsp;&nbsp;
<button
            class="boton_estandar boton_sobre_quienes"
            onClick={() => {
              navigate("/");
            }}
          >
            Comenzar!
          </button></p> </div>
    </>
  );
}

export default QuienesSomos;
