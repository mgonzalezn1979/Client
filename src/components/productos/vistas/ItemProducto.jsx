import React from "react";
import { useContext } from "react";
import { Context } from "../../contexto/Context";
import signoMas from "../../../assets/imagenes/signo_mas.png";
import signoMenos from "../../../assets/imagenes/signo_menos.png";

function ItemProducto({ cantidad, nombre, total, ID, urlFoto }) {
  console.log("item Producto ID:" + ID);
  const flag = cantidad >=2 ? false : true;
  const { agregarItemProducto, quitarItemProducto, eliminarProducto,
    setMensajeria } =
    useContext(Context);

  function handleAgregarItemProducto() {
    setMensajeria("");
    agregarItemProducto(ID);
  }

  function handleQuitarItemProducto() {
    setMensajeria("");
    quitarItemProducto(ID);
  }

  function handleEliminarProducto() {
    setMensajeria("");
    eliminarProducto(ID);
  }
  return (
    <>
      <div class="row listado">
        <div class="col-lg-4">
          {urlFoto ? <img class="imagen_producto" src={urlFoto}></img> : null}
        </div>
        <div class="col-lg-5">

        <p class="texto_descripcion">
          {cantidad} x {nombre}
        </p>
        <p class="texto_descripcion">
          total:{(Math.round(total * 100) / 100).toFixed(2)} €
        </p>        
        <img src={signoMas} class="imagen_signos" onClick={handleAgregarItemProducto}></img>
        <img hidden = {flag} src={signoMenos} class="imagen_signos" onClick={handleQuitarItemProducto}></img>
        
        </div>
        <div class="col-lg-1 middle">

        <button class="boton_estandar" onClick={handleEliminarProducto}>
          Eliminar
        </button>
        </div>
     
       
      </div>
    </>
  );
}
export default ItemProducto;
