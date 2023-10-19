import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookies';

function Login( ){

    const [formData, setFormData] = useState({
        emailUsername:'',
        password:''
        
    });

 const [sesion, setSesion] = useState([]);

 const navigate = useNavigate();
   
  
  useEffect(() => 
//   function verifica()
{
    let sesionGuardado = Cookies.getItem("sesion")==null?JSON.parse(Cookies.getItem("sesion")):[];
    
    console.log(sesionGuardado);
    console.log('eterno loop????');
    if(sesionGuardado==null)
    {
        console.log('no habemus sesion!');
        //navigate('/');
    }
// }
//verifica();
  }, []);





    function handleSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:3000/api/acceso/login', {
            emailUsername: formData.emailUsername, 
            password: formData.password
            
        }).then(res=>{

            const status = res.data.status;
            //interpreta respuesta de backend

            switch(status)
            {
            case 0:              //cod respuesta 0 inicio exitoso            alert('Inicio de sesion satisfactorio');
            localStorage.setItem('usuario',res.data.usuario);

            Cookies.setItem('sesion', JSON.stringify(res.data.usuario),{expires:1});
            setSesion(JSON.stringify(res.data.usuario));
            console.log('va a grabar en cookie el username');
            navigate('/');
            break;

            case 1://cod respuesta 1 usuario o email no existe
            alert('Usuario o Email no existe');
            break;

            case 2://cod respueta 2 contraseña incorrecta
            alert('Contraseña incorrecta');
            break;

            }           
        }).catch(err=>{
            if (err.response.status == 401) {
                alert('Email o contraseña incorrectos')
            }
        });
        
    }
    
    function handleChange(e){
        

        const {name,value} = e.target;
         
        setFormData(
            {
                ...formData,
                [name]: value
            }
        );
       }



    return(
        <>
        <p>Login</p>
        
        <p>aca el formulario de login acceso</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="ingreso">Email ó usuario(username):</label>
            <input type="text" name="emailUsername" id="emailUsername" onChange={handleChange} />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"
            onChange={handleChange}
            />
            <br />
            <input type="submit" value="Iniciar sesión"/>
            </form>
        <br/>
            <a href="register">Registrar nuevo usuario</a>       
        </>
    )
}

export default Login;