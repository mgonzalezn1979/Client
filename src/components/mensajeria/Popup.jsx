/** Funcion principal Popup:
 * Despliegue de un mensaje pasado por parametro 
 * como por ejemplo resultado de invokacion de apis,
 * errores o problemas con validacion/ */
import React, { useEffect } from "react";
import { useState } from "react";
function Popup({ mensaje }) {

  return (
    <div class="cotainer">
    <div class="row  align-items-center">
     <center><div class="col-xl-5 col-lg-6 col-md-11 col-sm-8 col-xs-12 alert alert-primary popup" role="alert" hidden={mensaje==''?true:false}>
      {mensaje}   
    </div></center>
    </div></div>
  );

}
export default Popup;
