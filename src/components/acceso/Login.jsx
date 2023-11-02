import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookies";
import { useContext } from "react";
import { Context } from "../contexto/Context";
import Popup from "../mensajeria/Popup";
// import imagenLateral1 from "../../assets/imagenes/lateral_decorativo_cafe_matcha.jpg";
// import imagenLateral2 from "../../assets/imagenes/lateral_mesa_macaron.jpg";
import BannerSuperior from "../BannerSuperior";

function Login() {
  const [formData, setFormData] = useState({
    emailUsername: "",
    password: "",
  });

  const [mensajeria, setMensajeria] = useState("");
  const [noInvokando, setNoInvokando] =  useState(true);

  const navigate = useNavigate();

  const { sesion, setSesion, setTipoUsuario } = useContext(Context);

  function handleSubmit(e) {
    setMensajeria("");
    e.preventDefault();
    setNoInvokando(false);

    axios
      .post("http://localhost:3000/api/acceso/login", {
        emailUsername: formData.emailUsername,
        password: formData.password,
      })
      .then((res) => {
        setNoInvokando(true);
        const status = res.data.status;
        //interpreta respuesta de backend
        switch (status) {
          case 0: //cod respuesta 0 inicio exitoso
            localStorage.setItem("usuario", res.data.usuario);
            Cookies.setItem("sesion", JSON.stringify(res.data.usuario), {
              expires: 1,
            });
            setSesion(res.data.usuario);
            console.log("va a grabar en cookie el username");
            setTipoUsuario(res.data.usuario.tipoUsuario);
            navigate("/");
            break;

          case 1: //cod respuesta 1 usuario o email no existe
            setMensajeria("Usuario o Email no existe");
            break;

          case 2: //cod respueta 2 contraseña incorrecta
            setMensajeria("Contraseña incorrecta");
            break;
        }
      })
      .catch((err) => {
        setNoInvokando(true);
        if (err.code) {
          setMensajeria("Error de conexion");
        } else if (err.response.status == 401) {
          setMensajeria("Email o contraseña incorrectos");
        } else {
          setMensajeria("Error de conexion");
        }
      });
  }

  function handleChange(e) {

    setMensajeria("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
   
    <div class="container-fluid">
       <BannerSuperior />

      <div class="row">
        <div class="col-lg-3">
          
        </div>

        <div class="col-lg-5 listado capa_opacidad_titulo">
          <br/>
          {mensajeria.length > 0 ? <Popup mensaje={mensajeria} /> : null}
          
 
        <p class="texto_descripcion">
          Bienvenido, Para poder continuar favor ingresa tu nombre de usuario ó correo electrónico y la contraseña</p>

 
  
           
            <br />
            <form onSubmit={handleSubmit}>
              <div class="row">
                 
              <label class="" htmlFor="ingreso">
                Email ó usuario(username):
              </label>
              
              
              <input
                type="text"
                class="input_form"
                name="emailUsername"
                id="emailUsername"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                class="input_form"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
             
             

              <br />
              {(noInvokando)?<input type="submit" value="Ingresar" class="boton_estandar" />:
              <button class="boton_estandar" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Ingresando...
            </button>
              }
              <button class="boton_estandar" onClick={()=>{
            navigate("/register");
          }} >Registrar</button>        
</div>
 
            </form>
            
           
           
         </div> 
         <div class="col-lg-3">
       
        </div></div>

         <div class="centro_horizontal row">
           
            
          <p class="texto_blanco">
            Si no estas registrado haz clic en registrar</p>
                   
        </div>
        </div>
        
       
    
  );
}

export default Login;
