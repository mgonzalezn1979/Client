import React from "react";
import Cookies from "js-cookies";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexto/Context";
import checkedImage from "../../../assets/imagenes/checked.png";
 

function Producto(producto) {
  const { agregarProducto, pedido } = useContext(Context);
  const [check, setCheck] = useState(false);

  console.log(pedido);
  useEffect(() => {
    console.log("objeto producto");
    console.log(producto);
  }, []);

  function handleAgregarProducto() {
    setCheck(true);
    agregarProducto(
      producto.producto.ID,
      producto.producto.Nombre,
      producto.producto.precio,
      producto.producto.urlFoto
    );
  }
  return (
    <>
    <div class="col-lg-2"></div>
    <div class="col-lg-10 listado">
        <div class="container fluid ">
          <div class="row">
            <div class="col-lg-4">
              <div>
                {producto.producto.urlFoto ? (
                  <img
                    class="imagen_producto"
                    src={producto.producto.urlFoto}
                  ></img>
                ) : null}
              </div>
            </div>
            <div class="col-lg-4">
            <p class="fuenteGrande">{producto.producto.Nombre}</p><br/>
            <p class="fuenteEstandar"> {producto.producto.Descripcion}</p>
            </div>
            <div class="col-lg-3 center">
            
              <p class="fuenteGrande"> {producto.producto.precio} €</p>
              <button class="boton_estandar" onClick={handleAgregarProducto}>
              Agregar
            </button>
            <br/>
            {check?<img src={checkedImage} class="imagen_checked" ></img>:null}
            </div>
          </div>
           
        </div>
      </div>
    </>
  );
}
export default Producto;
