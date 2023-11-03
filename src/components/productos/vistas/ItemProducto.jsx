/** Funcionalidad principal ItemProducto:
 * 
 * Permite 
 * - despliegue del producto agregado a la canasta
 * - agregar un producto (signo +)
 * - quitar un producto (signo -)
 * - eliminar producto de canasta
 * */
import React from "react";
import { useContext } from "react";
import { Context } from "../../contexto/Context";

/** imagnees de icono de signo mas y menos */
import signoMas from "../../../assets/imagenes/signo_mas.png";
import signoMenos from "../../../assets/imagenes/signo_menos.png";

function ItemProducto({ cantidad, nombre, total, ID, urlFoto }) {

  const flag = cantidad >=2 ? false : true;

  /** Utilizacion de funciones globales del contexto para operar sobre los productos y mensajeria */
  const { agregarItemProducto, quitarItemProducto, eliminarProducto,
    setMensajeria } =
    useContext(Context);

    /** Suma un item al producto  */
  function handleAgregarItemProducto() {
    setMensajeria("");
    agregarItemProducto(ID);
  }

  /** Quita un item al producto */
  function handleQuitarItemProducto() {
    setMensajeria("");
    quitarItemProducto(ID);
  }

  /** Elimina producto de la canasta */
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
