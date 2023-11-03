/** funcionalidad principal Login:
 * Permite ingresar credenciales al sitio para iniciar sesion
 */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** utiliza cookies e invoka api */
import axios from "axios";
import Cookies from "js-cookies";

/** Permite operar con los elementos globales declarados en contexto */
import { useContext } from "react";
import { Context } from "../contexto/Context";

/** Permite despliegue de mensajeria */
import Popup from "../mensajeria/Popup";
/** dibuja barra superior */
import BannerSuperior from "../BannerSuperior";

function Login() {
  const [formData, setFormData] = useState({
    emailUsername: "",
    password: "",
  });
  /** para el paso de mensajes a desplegar como resultado en pantalla  */
  const [mensajeria, setMensajeria] = useState("");

  /** flag que marca true cuando se esta invocando el servicio de api */
  const [noInvokando, setNoInvokando] = useState(true);

  /** permite dirigir a otra pagina */
  const navigate = useNavigate();

  /** estados globales del contexto */
  const { setSesion, setTipoUsuario, URL_PATH_API } = useContext(Context);

  /** Funcion que permite validar el formulario del inicio de
   * sesion invokando la api de login
   * De estar todo ok redirige a pagina principal o home con
   * la sesion iniciada (cookie)
   * si hay algun problema la mensajeria mostrara respuesta de api
   */
  function handleSubmit(e) {
    setMensajeria("");
    e.preventDefault();
    setNoInvokando(false);
    axios
      .post(URL_PATH_API+"/api/acceso/login", {
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

  /** permite la persistencia de los estados locales 
   * al cambiar un valor
   * usuario, contraseña
   */
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
        <div class="col-lg-3"></div>

        <div class="col-lg-5 listado capa_opacidad_titulo">
          <br />
          {mensajeria.length > 0 ? <Popup mensaje={mensajeria} /> : null}
          <center>
            <p class="fuenteGrande">Bienvenido</p>
            <br />
          </center>
          <p class="fuenteEstandar">
            Para poder continuar favor ingresa tu nombre de usuario ó correo
            electrónico y la contraseña
          </p>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div class="row">
              <label class="fuenteChica" htmlFor="ingreso">
                Email ó usuario(username):
              </label>
              <input
                type="text"
                class="input_form login_form_input"
                name="emailUsername"
                id="emailUsername"
                onChange={handleChange}
              />
              <br />
              <label class="fuenteChica" htmlFor="password">
                Password:
              </label>
              <input
                class="input_form login_form_input"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <br />

              <br />
              {noInvokando ? (
                <input type="submit" value="Ingresar" class="boton_estandar" />
              ) : (
                <button class="boton_estandar" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Ingresando...
                </button>
              )}
              <button
                class="boton_estandar"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Registrar
              </button>
            </div>
          </form>

          <center>
            <p class="fuenteChica">
              Si no estas registrado haz clic en registrar
            </p>
          </center>
        </div>

        <div class="col-lg-3"></div>
      </div>

      <div class="centro_horizontal row"></div>
    </div>
  );
}

export default Login;
