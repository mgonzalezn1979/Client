/** Funcionalidad principal Producto:
 * permite
 * - visualizar contenido de producto 
 * - agregar producto a la canasta
 * 
 * al iniciar recibe como parametro el objeto producto 
 * sobre el cual despliega contenido
 */

import React from "react";

/** utiliza elementos globales del contexto  */
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexto/Context";
/** icono que se muestra al agregar producto */
import checkedImage from "../../../assets/imagenes/checked.png";

function Producto(producto) {
    /** utiliza del contexto, funcion para agregar producto a la canasta */
  const { agregarProducto } = useContext(Context);
    /** flag que muestra o no el icono check al agregar producto */
  const [check, setCheck] = useState(false);

//   useEffect(() => {
//     console.log("objeto producto");
//     console.log(producto);
//   }, []);

/** Permite agregar producto a a canasta, 
 * pasa como parametros de uso local
 * las propiedades del producto
 * a la funcion de agregar producto proveniente del contexto global
 */
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
