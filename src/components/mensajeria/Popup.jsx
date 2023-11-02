import React, { useEffect } from "react";
import { useState } from "react";
function Popup({ mensaje }) { 



  return (


     <div onClick={()=>{mensaje='';}} class="alert alert-primary popup" role="alert" id="popup_mensajeria" hidden={mensaje==''?true:false}>
      {mensaje}
   
    </div>
  );


}
export default Popup;
{/* <div class="alert alert-primary" role="alert" hidden={!visible} ></div> */}