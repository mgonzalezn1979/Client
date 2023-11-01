import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookies";
import { useContext } from "react";
import { Context } from "../contexto/Context";
import Popup from "../mensajeria/Popup";

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
      <div class="row">
        <div class="col-lg-3"></div>

        <div class="col-lg-4">
          <br/>
          {mensajeria.length > 0 ? <Popup mensaje={mensajeria} /> : null}
          
<div >
        <h5>Para poder continuar favor ingresa tu nombre de usuario ó correo electrónico y la contraseña</h5>

</div>
  
          <div class="inicio_sesion">
            <br />
            <form onSubmit={handleSubmit}>
              <label class="" htmlFor="ingreso">
                Email ó usuario(username):
              </label>
              <input
                type="text"
                name="emailUsername"
                id="emailUsername"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <br />
              <br />

              <br />
              {(noInvokando)?<input type="submit" value="Ingresar" class="btn btn-primary" />:
              <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Ingresando...
            </button>
              }        

              
            </form>
           
          </div>
          <br/><br/><br/>

          <div class="contenedor_titulos">
          <h5>Si no estas registrado haz clic en registrar</h5>
          <a class="btn btn-primary" href="register" role="button">
            Registrar nuevo usuario
          </a>
          </div>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
  );
}

export default Login;
