import React from 'react';
import { useState } from 'react';
import { counterContext } from './ContextoUsuario';
import {Pedido} from '../class/Pedido';

const StateContext=({children})=>
{

    const [counter, setCounter] = useState(0);
    const [pedidoActual, setPedidoActual] = useState(new Pedido())

    const increment = ()=>{
        setCounter(prev=>prev+1);
    }
 

    return(
        <counterContext.Provider
        value={pedidoActual}>{children}</counterContext.Provider>
    )

}
export default StateContext;