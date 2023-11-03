import React from "react";
import { useState, useEffect } from "react";
import Popup from "../mensajeria/Popup";
import axios from "axios";
import BannerSuperior from "../BannerSuperior";
import { useContext } from "react";
import { Context } from "../contexto/Context";
 
function Register() {
  /** flag que permite setear cuando se esta invocando api o no */
  const [noInvokando, setNoInvokando] = useState(true);
  /** datos del formulario de creacion de usuario  */
  const [formData, setFormData] = useState({
    username: "",
    nombre: "",
    apellidos: "",
    email: "",
    password1: "",
    password2: "",
    fechaNac: "",
  });
/** mensajeria para despliegue de resultado */
  const [mensajeria, setMensajeria] = useState("");

  /** estados globales del contexto */
  const { URL_PATH_API } = useContext(Context);

  /** persistencia sobre el formulario y los datos asociados a la creacion de usuairo */
  function handleChange(e) {
    setNoInvokando(true);
    setMensajeria("");
    const { name, value } = e.target;
    console.log("name:" + name + " value:" + value);
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  /** al crear usuario se valida si esta ok se invoca API 
   * para crear en la base datos
   */

  function handleSubmit(e) {
    setNoInvokando(false);
    e.preventDefault();
    const validado = validaFormulario(formData);

    if (validado) {
      console.log("llamar api register");
      setNoInvokando(true);

      //formulario ok
      axios
        .post(URL_PATH_API+"/api/acceso/register", {
          username: formData.username,
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          fechaNac: formData.fechaNac,
          password: formData.password1,
          telefono: formData.telefono,
          email: formData.email,
        })
        .then((res) => {
          setNoInvokando(false);
          console.log("respuesta de api");
          const respuesta = res.data;
          if (respuesta.status == 0) {
            location.replace("/login");
          } else {
            setError({ status: respuesta.status, message: respuesta.message });
            setMensajeria(respuesta.message);
          }
        })
        .catch((error) => {
          setNoInvokando(false);
          setMensajeria("Error en API");
          console.log("error en api");
          setError({ status: 1, message: error });
        });
    }
    console.log("handleSubmit");
  }

  function validaFormulario(form) {
    const evalueTel = /^\d{0,12}$/;

    if (form.telefono != undefined) {
      if (!evalueTel.test(form.telefono)) {
        setMensajeria("Error al validar numero de telefono");
        return false;
      }
    }

    const email = form.email;
    if (email.trim() == "") {
      setMensajeria("Debe escribir un email");
      return false;
    }
    const evaluaEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!evaluaEmail.test(email)) {
      setMensajeria("Debe escribir un email valido");
      return false;
    }
    const username = form.username;
    const evalueUsername = /^[a-zA-Z0-9]{2,20}$/;

    if (!evalueUsername.test(username)) {
      setMensajeria(
        "Debe ingresar un username valido (3 a 20 caracters maximo)"
      );
      return false;
    }

    const evaluaNombre = /^[a-zA-Z]{2,50}$/; //entre 2 y 50 solo caracteres

    if (!evaluaNombre.test(form.nombre)) {
      setMensajeria("Debe ingresar nombre valido(max 50 caracteres");
      return false;
    }

    const password1 = form.password1;
    const password2 = form.password2;

    if (password1.trim() == "" || password2.trim() == "") {
      return false;
    }

    const evaluePass = /^(\w\d)*\S{5,20}$/; //Debe contener al menos 5 caracteres maximo 8, solo digitos, minusculas y mayusculas

    if (!evaluePass.test(password1)) {
        setMensajeria("Contraseña debe contener solo caracteres y/o numeros");
        return false;
    }

    if (password1 != password2) {
      setMensajeria("Contraseñas no coinciden");
      return false;
    }
    return true;
  }

  return (
    <div class="container-fluid">
      <BannerSuperior />
      {mensajeria.length > 0 ? <Popup mensaje={mensajeria} /> : null}
      <div class="row ">
        <div class="col-lg-3"></div>

        <div class="col-lg-6 listado margen-medio">
        <center><p class="fuenteGrande">Registro nuevo usuario</p><br/></center>
          <form onSubmit={handleSubmit}>
            <label class="fuenteChica" htmlFor="username">Nombre de usuario(username)</label>
            <input
              type="text"
              class="input_form"
              name="username"
              id="username"
              onChange={handleChange}
            />

            <label htmlFor="email" class="fuenteChica" >Email:</label>
            <input
            class="input_form texto_formulario"
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
            />

            <label htmlFor="Nombre" class="fuenteChica" >Nombre:</label>
            <input
              type="text"
              class="input_form texto_formulario"
              name="nombre"
              id="nombre"
              onChange={handleChange}
              placeholder="Ingrese su nombre"
            />

            <label htmlFor="Apellidos" class="fuenteChica" >Apellidos:(opcional)</label>
            <input
              type="text"
              class="input_form texto_formulario"
              name="apellidos"
              id="apellidos"
              onChange={handleChange}
              placeholder="Ingrese su apellido"
            />

            <label htmlFor="Fecha Nacimiento" class="fuenteChica" >Fecha de Nacimiento:(opcional)</label>
            <input class="input_form texto_formulario"
              type="date"
              name="fechaNacimiento"
              id="fechaNacimiento"
              onChange={handleChange}
              placeholder="Ingrese su fecha de nacimiento"
            />

            <label htmlFor="password1" class="fuenteChica" >Password:</label>
            <input
              type="password"
              class="input_form texto_formulario"
              name="password1"
              id="password1"
              onChange={handleChange}
              placeholder="solo caracteres y/o numeros"
            />

            <label htmlFor="password2" class="fuenteChica" >Repita el password:</label>
            <input
              type="password"
              name="password2"
              class="input_form texto_formulario"
              id="password2"
              onChange={handleChange}
              placeholder="Repita contraseña anterior"
            />
            <label htmlFor="telefono" class="fuenteChica">Telefono:(opcional)</label>
            <input
              type="number"
              name="telefono"
              class="input_form texto_formulario"
              id="telefono"
              onChange={handleChange}
              placeholder="Ingrese su numero de telefono"
            />
            <center>
<br/>
            {noInvokando ? (
              <input type="submit" value="Registrar" class="boton_estandar" />
            ) : (
              <button class="boton_estandar" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Registrando...
              </button>
            )}
        
            </center>
          </form>
          </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
  );
}

export default Register;

// {error.status!=0?<div class="row" ><div class="col-lg-4"></div><Popup message={error.message}/><div></div>:null}
