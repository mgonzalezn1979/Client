import React from "react";
import {useState, useEffect} from 'react';
import Popup from "../mensajeria/Popup";
import axios from "axios";

function Register(){

    const [noInvokando, setNoInvokando] =  useState(true);
    const [mensajeria, setMensajeria] = useState("");

    
    const [error, setError] = useState({
        status:0,
        message:''
    })

    const [formData, setFormData] = useState({
        username:'',
        nombre:'',
        apellidos:'',
        email:'',
        password1:'',
        password2:'',
        fechaNac:''
    });

function handleChange(e)
{
    setNoInvokando(false);
    setError({status:0,message:''});
    const {name,value} = e.target;
    console.log('name:'+name+' value:'+value);
        setFormData(
            {
                ...formData,
                [name]: value
            }
        );
}

function handleSubmit(e){
    setNoInvokando(false);
    e.preventDefault();
    const validado = validaFormulario(formData);
    if(validado)
    {
        console.log('llamar api register');
        setNoInvokando(true);
    
        //formulario ok
        axios.post('http://localhost:3000/api/acceso/register',{
            username:formData.username,
            nombre:formData.nombre,
            apellidos:formData.apellidos,
            fechaNac:formData.fechaNac,
            password:formData.password1,
            telefono:formData.telefono,
            email:formData.email


        }

        ).then(res=>{
            setNoInvokando(false);
            console.log('respuesta de api');
            const respuesta = res.data;
            if(respuesta.status==0)
            {
            location.replace('/login');
            }
            else{
                setError({status:respuesta.status, message:respuesta.message});
            }
        }
        ).catch(error=>{

            setNoInvokando(false);
            console.log('error en api');
            setError({status:1, message:error});
        }
        );
    }
console.log('handleSubmit');
}

function validaFormulario(form)
{
    const telefono = form.telefono;
    try {
        parseInt(telefono);
    } catch (error) {
        setError({status:1, message:"Error al validar numero de telefono"});
        return false;
    }

    const email = form.email;
    if(email.trim()==''){
        setError({status:1, message:"Debe escribir email"});
        return false;
    }

    const username = form.username;
    if(username.trim()=='')
    {
        setError({status:1, message:"Debe escribir nombre de usuario"});
        false;
    }

    const password1 = form.password1;
    const password2 = form.password2;

    if(password1.trim()=='' || password2.trim()=='')
    {
        setError({status:1, message:"Debe escribir contraseña"});
        return false;
    }

    if(password1!=password2){
        setError({status:1, message:"Contraseñas no coinciden"});
        return false;
    }
     return true;
}



return(
    <div class="container-fluid">  

 

    <div class="row">
    <div class="col-lg-3">
    </div>

    <div class="col-lg-6">
    <h1>Registro nuevo usuario</h1>
    <form onSubmit={handleSubmit}>

    <label htmlFor="username" >Nombre de usuario(username)</label>
    <input type="text" name="username" id="username" onChange={handleChange} />
    <br/>
    <label htmlFor="email" >Email:</label>
    <input type="text" name="email" id="email" onChange={handleChange} />
    
    <br/>
    <label htmlFor="Nombre" >Nombre:</label>
    <input type="text" name="nombre" id="nombre" onChange={handleChange} />
    
    <br/>
    <label htmlFor="Apellidos" >Apellidos:</label>
    <input type="text" name="apellidos" id="apellidos" onChange={handleChange} />
    <br/>
    
    <label htmlFor="Fecha Nacimiento:" >Fecha de Nacimiento:</label>
    <input type="date" name="fechaNacimiento" id="fechaNacimiento" onChange={handleChange} />
    <br/>
    
    <label htmlFor="password1" >Password:</label>
    <input type="password" name="password1" id="password1" onChange={handleChange} />
    <br/>
    
    <label htmlFor="password2" >Repita el password:</label>
    <input type="password" name="password2" id="password2" onChange={handleChange} />
    <br/>

    <br/>
    <label htmlFor="telefono" >Telefono:</label>
    <input type="number" name="telefono" id="telefono" onChange={handleChange} />
    <br/>
    <br/>
    <input type="submit" value="Registrar" />


    {(noInvokando)?<input type="submit" value="Registrar" class="btn btn-primary" />:
              <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Registrando...
            </button>
              }     
    <br/>
    </form>
    </div>
    <div class="col-lg-3">
    </div>
    </div>    
    </div>
)
}

export default Register;


// {error.status!=0?<div class="row" ><div class="col-lg-4"></div><Popup message={error.message}/><div></div>:null}
  