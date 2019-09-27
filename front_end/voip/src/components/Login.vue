
<template>
  <div class="login">
    <div class="container login__container">
      <div class="login__wrap">
        <div class="login__header">
          <img alt="Vue logo" src="../assets/logo.png" />
          <span class="login__header--titulo">Bienvenido</span>
        </div>

        <form class="login__body validate-form">
          <div class="login__body--wrap validate-input">
            <span class="login__body--datos">Nombre de Usuario</span>
            <input
              class="login__body--user-input"
              type="text"
              name="username"
              placeholder="Igrese Nombre de Usuario"
            />
            <span class="login__body--focus"></span>
          </div>

          <div class="login__body--wrap">
            <span class="login__body--datos">Contraseña</span>
            <input
              class="login__body--user-input"
              type="password"
              name="pass"
              placeholder="Ingrese Contraseña"
            />
            <span class="login__body--focus"></span>
          </div>

          <div class="flex-sb-m w-full p-b-30">
            <div>
              <input class="checkbox" id="ckb1" type="checkbox" />
              <label class="checkbox--label" for="ckb1">Recordar mi Contraseña</label>
            </div>

            <div>
              <a href="#" class="txt1">¿Olvido su Contraseña?</a>
            </div>
          </div>

          <div class="boton">
            <button class="boton__login">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
var Vue = require("vue");

window.Vue = Vue;

global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

//focus
$(".input100").each(function() {
  $(this).on("blur", function() {
    if (
      $(this)
        .val()
        .trim() != ""
    ) {
      $(this).addClass("has-val");
    } else {
      $(this).removeClass("has-val");
    }
  });
});

//validar
var input = $(".validate-input .input100");

$(".validate-form").on("submit", function() {
  var check = true;

  for (var i = 0; i < input.length; i++) {
    if (validate(input[i]) == false) {
      showValidate(input[i]);
      check = false;
    }
  }

  return check;
});

$(".validate-form .input100").each(function() {
  $(this).focus(function() {
    hideValidate(this);
  });
});

function validate(input) {
  if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
    if (
      $(input)
        .val()
        .trim()
        .match(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
        ) == null
    ) {
      return false;
    }
  } else {
    if (
      $(input)
        .val()
        .trim() == ""
    ) {
      return false;
    }
  }
}

function showValidate(input) {
  var thisAlert = $(input).parent();

  $(thisAlert).addClass("alert-validate");
}

function hideValidate(input) {
  var thisAlert = $(input).parent();

  $(thisAlert).removeClass("alert-validate");
}

export default {
  name: "Login"
};
</script>