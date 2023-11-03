/** Funcion principal Popup:
 * Despliegue de un mensaje pasado por parametro 
 * como por ejemplo resultado de invokacion de apis,
 * errores o problemas con validacion/ */
import React, { useEffect } from "react";
import { useState } from "react";
function Popup({ mensaje }) {

  return (
     <div class="alert alert-primary popup" role="alert" hidden={mensaje==''?true:false}>
      {mensaje}   
    </div>
  );

}
export default Popup;
