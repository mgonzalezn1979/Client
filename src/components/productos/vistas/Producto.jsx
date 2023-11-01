import React from "react";
import Cookies from "js-cookies";
import { useContext, useEffect } from "react";
import { Context } from "../../contexto/Context";

function Producto(producto) {
  const { agregarProducto, pedido } = useContext(Context);
  console.log(pedido);
  useEffect(() => {
    console.log("objeto producto");
    console.log(producto);
  }, []);

  function handleAgregarProducto() {
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
            <p class="texto_nombre">{producto.producto.Nombre}</p><br/>
            <p class="texto_descripcion"> {producto.producto.Descripcion}</p>
            </div>
            <div class="col-lg-3 center">
            
              <p class="nombre"> {producto.producto.precio} €</p>
              <button class="boton_estandar" onClick={handleAgregarProducto}>
              Agregar
            </button>
            </div>
          </div>
           
        </div>
      </div>
    </>
  );
}
export default Producto;
