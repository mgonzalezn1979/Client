import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PedidoDetalle({ detalle, ID_Pedido }) {

    const navigate = useNavigate();

  const [visible, setVisible] = useState(true);
//   const [idPedido, setIdPedido] = useState(0);
  console.log("pedido detalle " + detalle);
//   setIdPedido(ID_Pedido);
  // function handleStatus()
  const handleStatus = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleEliminarPedido = () => {
    console.log("ELMINAR PEDIDO ID:" + ID_Pedido);
    axios.delete("http://localhost:3000/api/pedidos/eliminar/"+ID_Pedido)
    .then((data)=>{
        console.log("eliminado?");
        console.log(data);
        navigate('/misPedidos');
        //QUITAR DE LISTADO
    }).catch((error)=>{
        console.log("error al eliminar pedido id "+ID_Pedido)
    });


    //llamar a axios para eliminar pedido
  };

  return (
    <>
      <p>
        ID Pedido:{detalle.ID} fecha:{detalle.FECHA} total:{detalle.TOTAL}
      </p>
      {!visible ? <button onClick={handleStatus}>Ocultar</button> : <p></p>}
      {visible ? (
        <button onClick={handleStatus}>Ver</button>
      ) : (
        <p>
          <button onClick={handleEliminarPedido}>Eliminar</button>
          <button>Modificar</button>
          <div KEY={detalle.ID + "detalle"}>
            {detalle.items.map((item) => {
              return (
                <div>
                  <p>
                    cantidad:{item.cantidad} Producto:{item.nombre} Subtotal:
                    {item.subtotal}
                  </p>
                </div>
              );
            })}
          </div>
        </p>
      )}

      <br />
    </>
  );
}
export default PedidoDetalle;
// </button>:<button onClick={setVisible(false)}>Ocultar</button>}

// <button display={visible} onClick={setVisible(true)}>Ver</button>
//         <button onClick={setVisible(false)}>Ocultar</button>

//         <div>
//             <p>Detalle</p>

//         </div>
