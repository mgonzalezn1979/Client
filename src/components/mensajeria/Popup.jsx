import React, { useEffect } from "react";
import { useState } from "react";
function Popup({ mensaje }) { 



  return (


     <div class="alert alert-primary" role="alert" id="popup_mensajeria" hidden={mensaje==''?true:false}>
      {mensaje}
   
    </div>
  );


}
export default Popup;
{/* <div class="alert alert-primary" role="alert" hidden={!visible} ></div> */}