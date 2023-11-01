import React from "react";
import { useContext } from "react";
import { Context } from "../../contexto/Context";

function ItemProducto({ cantidad, nombre, total, ID, urlFoto }) {
  console.log("item Producto ID:" + ID);
  const flag = cantidad > 1 ? false : true;
  const { agregarItemProducto, quitarItemProducto, eliminarProducto } =
    useContext(Context);

  function handleAgregarItemProducto() {
    agregarItemProducto(ID);
  }

  function handleQuitarItemProducto() {
    quitarItemProducto(ID);
  }

  function handleEliminarProducto() {
    eliminarProducto(ID);
  }
  return (
    <>
      <div class="row listado">
        <div class="col-lg-4">
          {urlFoto ? <img class="imagen_producto" src={urlFoto}></img> : null}
        </div>
        <div class="col-lg-4">

        <p>
          {cantidad} x {nombre} total:{total}{" "}
        </p>
        <button class="boton_signos" onClick={handleQuitarItemProducto} disabled={flag}>
          -
        </button>
        <button class="boton_signos" onClick={handleAgregarItemProducto}>
          +
        </button>
        </div>

        <button class="boton_estandar" onClick={handleEliminarProducto}>
          Eliminar
        </button>
     
       
      </div>
    </>
  );
}
export default ItemProducto;
