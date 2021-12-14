const formLog  = document.getElementById("FormularioLogIn");
const formSign  = document.getElementById("FormularioSignUp");
const warningDNI = document.getElementById("validarDNI");
const warningNombre = document.getElementById("validarNombre");
const warningPass = document.getElementById("validarPass");
const warningSaldo = document.getElementById("validarSaldor");
const warningDNIL = document.getElementById("validarDNIL");
const warningPassL = document.getElementById("validarPassL");
const validarLogIn = document.getElementById("validarLog");
const warningSaldoOp2 = document.getElementById("validarSaldoOp2");
const warningSaldoOp3 = document.getElementById("validarSaldoOp3");
  
let dni = document.getElementById("txt_dni_S");
let nombre = document.getElementById("txt_nombre");
let password = document.getElementById("txt_pass_S");
let saldo = document.getElementById("txt_saldo");
let dniL = document.getElementById("txt_dni_L");
let passwordL = document.getElementById("txt_pass_L");
let saludo = document.getElementById("saludo");
let saldoFinalO1 = document.getElementById("SaldoActualO1");
let saldoFinalO2 = document.getElementById("SaldoActualO2");
let saldoFinalO3 = document.getElementById("SaldoActualO3");
let aumentarSaldo = document.getElementById("txt_ingresar_monto");
let disminuirSaldo = document.getElementById("txt_retirar_monto");

let cuentas = 
[{ dni: 15936874, nombre: "Mali", password: 'helloworld', saldo: 200 },
{ dni: 41523687, nombre: "Gera", password: 'l33t', saldo: 290 },
{ dni: 35698712, nombre: "Maui", password: '123', saldo: 67}];


class Persona
{
  constructor(dni,nombre, password,saldo) {
    this.dni = dni;
    this.nombre = nombre;
    this.password = password;
    this.saldo = saldo;
  }
}    
    
let crearTabla = function(listaCuentas)
{
  let htmlTabla = "<tr><th>DNI</th><th>Nombre</th><th>Password</th><th>Saldo</th></tr>"
  
  for(let cuenta of listaCuentas)
  {
    let fila = "<tr> <td>"
    fila += cuenta.dni;
    fila += "</td>"

    fila += "<td>"
    fila += cuenta.nombre;
    fila += "</td>"

    fila += "<td>"
    fila += cuenta.password;
    fila += "</td>"

    fila += "<td>"
    fila += cuenta.saldo;
    fila += "</td>"

    fila += "</tr>"

    htmlTabla += fila;
  }

  return htmlTabla;
};

document.getElementById("tablaUsuarios").innerHTML= crearTabla(cuentas);

//Validacion Login In

formLog.addEventListener("submit", e => {
  e.preventDefault()

  warningPassL.innerHTML = "", warningDNIL.innerHTML = "";
  let invalidoPassL = false, invalidoDNIL = false;
  
  if(dniL.value.length == 8)
  {
    invalidoDNIL = false;
  }
  else
  {
    invalidoDNIL = true;
  }

  if(passwordL.value.length < 3)
  {
    invalidoPassL = true;
  }
  else
  {
    invalidoPassL = false;
  }

  if(invalidoPassL)
  {
    warningPassL.innerHTML = "La contraseña debe tener al menos 3 caracteres";
  }

  if(invalidoDNIL)
  {
    warningDNIL.innerHTML = "El DNI debe tener 8 digitos";
  }
  
 if(invalidoDNIL==false && invalidoPassL == false)
 {
  const buscarDNI = cuentas.filter(persona => persona.dni == dniL.value);

  if(buscarDNI.length == 0)
  {
    document.getElementById("ValidacionLog").style.display = 'block';
    document.getElementById("ValidacionLog").style.display = 'flex';
    document.getElementById("ValidacionLog").style.alignItems = 'center';
    document.getElementById("ValidacionLog").style.justifyContent = 'center';
    validarLogIn.innerHTML = "Esa cuenta no existe";
    LimpiarLogIn();
  }
  else{
    Buscar(dniL.value);
    if(cuentas[idUsuario]["password"] == passwordL.value)
    {
      document.getElementById("ValidacionLog").style.display = 'none';
      LimpiarLogIn();
      document.getElementById("panelLogSign").style.display = 'none';
      document.getElementById("menuMain").style.display = 'block';
      document.getElementById("menu").style.display = 'block';
      saludo.innerHTML = "Hola "+cuentas[idUsuario]["nombre"]+", que deseas realizar";
    }
    else{
      document.getElementById("ValidacionLog").style.display = 'block';
      document.getElementById("ValidacionLog").style.display = 'flex';
      document.getElementById("ValidacionLog").style.alignItems = 'center';
      document.getElementById("ValidacionLog").style.justifyContent = 'center';
      validarLogIn.innerHTML = "Contraseña incorrecta";
      passwordL.value = "";
    }
  }
 }

})

//Validacion Sign Up

formSign.addEventListener("submit", e => {
    e.preventDefault()

    warningSaldo.innerHTML = "", warningPass.innerHTML = "", warningDNI.innerHTML = "", warningNombre.innerHTML = "";
    let invalidoSaldo = false, invalidoPass = false, invalidoDNI = false, invalidoNombre = false;
    let nombrevalido = /^[a-zA-ZÀ-ÿ\s]{1,50}$/

    if(dni.value.length == 8 )
    {
      invalidoDNI = false;
    }
    else
    {
      invalidoDNI = true;
    }

    if(!nombrevalido.test(nombre.value))
    {
      invalidoNombre = true;
    }
    else
    {
      invalidoNombre = false;
    }

    if(password.value.length < 3)
    {
      invalidoPass = true;
    }
    else
    {
      invalidoPass = false;
    }

    if(!(saldo.value>=10 && saldo.value<=990))
    {
      invalidoSaldo = true;  
    }
    else
    {
      invalidoSaldo = false;
    }

    if(invalidoPass)
    {
      warningPass.innerHTML = "La contraseña debe tener al menos 3 caracteres";
    }

    if(invalidoSaldo)
    {
      warningSaldo.innerHTML = "Su cuenta debe estar entre $10 y $990";
    }

    if(invalidoDNI)
    {
      warningDNI.innerHTML = "El DNI debe tener 8 digitos";
    }
    
    if(invalidoNombre)
    {
      warningNombre.innerHTML = "El nombre debe contener solo letras";
    }

    if(invalidoDNI==false && invalidoNombre ==false && invalidoPass == false && invalidoSaldo==false)
    {
      
      const existe = cuentas.filter(persona => persona.dni == dni.value)

      if(existe.length == 0)
      {
        usuarios = new Persona(parseInt(dni.value),nombre.value,password.value,parseFloat(saldo.value));
        cuentas.push(usuarios);
        alert("Cuenta creada exitosamente");
        Buscar(dni.value);
        document.getElementById("panelLogSign").style.display = 'none';
        LimpiarSignIn();
        saludo.innerHTML = "Hola "+cuentas[idUsuario]["nombre"]+", que deseas realizar";
        document.getElementById("tablaUsuarios").innerHTML= crearTabla(cuentas);
        document.getElementById("menuMain").style.display = 'block';
        document.getElementById("menu").style.display = 'block';
      }
      else{
        alert("Esa cuenta ya existe");
        LimpiarSignIn();
      }
    }
  
})

function Buscar(buscarDNI)
{
  idUsuario = cuentas.findIndex(persona => persona.dni == buscarDNI);
}

function ConsultarSaldo()
{
  document.getElementById("op1").style.display = 'block';
  saldoFinalO1.innerHTML = "Tu saldo actual es de "+ cuentas[idUsuario]["saldo"];
}

function AceptarCS()
{
  document.getElementById("op1").style.display = 'none';
}

function IngresarMonto()
{
  document.getElementById("op2").style.display = 'block';
}

function AceptarIM()
{
  if(aumentarSaldo.value == 0)
  {
    warningSaldoOp2.innerHTML = "Debe ingresar un monto";
  }
  else
  {

    let auxIngresar = cuentas[idUsuario]["saldo"] ;
    cuentas[idUsuario]["saldo"] = cuentas[idUsuario]["saldo"] + parseFloat(aumentarSaldo.value);
    if(cuentas[idUsuario]["saldo"] <10 || cuentas[idUsuario]["saldo"] >990)
    {
      warningSaldoOp2.innerHTML = "La operacion excede los rangos permitidos";
      aumentarSaldo.value = "";
      saldoFinalO2.style.display = 'none';
      cuentas[idUsuario]["saldo"] = auxIngresar;
    }
    else
    {
      warningSaldoOp2.innerHTML = "";
      aumentarSaldo.value = "";
      saldoFinalO2.innerHTML = "Tu saldo actual es de $ "+ cuentas[idUsuario]["saldo"];
      saldoFinalO2.style.display = 'block';
      document.getElementById("tablaUsuarios").innerHTML= crearTabla(cuentas);
    }
    aumentarSaldo.value == "";
  }
}

function SalirIM()
{
  document.getElementById("op2").style.display = 'none';
  saldoFinalO2.innerHTML = "";
  saldoFinalO2.style.display = 'none';
}

function RetirarMonto()
{
  document.getElementById("op3").style.display = 'block';
}

function AceptarRM()
{
  if(disminuirSaldo.value == 0)
  {
    warningSaldoOp3.innerHTML = "Debe ingresar un monto";
  }
  else
  {
    let auxRetirar = cuentas[idUsuario]["saldo"] ;
    cuentas[idUsuario]["saldo"] = cuentas[idUsuario]["saldo"] - parseFloat(disminuirSaldo.value);
    if(cuentas[idUsuario]["saldo"] <10 || cuentas[idUsuario]["saldo"] > 990)
    {
      warningSaldoOp3.innerHTML = "La operacion excede los rangos permitidos";
      disminuirSaldo.value = "";
      saldoFinalO3.style.display = 'none';
      cuentas[idUsuario]["saldo"] = auxRetirar;
    }
    else
    {
      warningSaldoOp3.innerHTML = "";
      disminuirSaldo.value = "";
      saldoFinalO3.innerHTML = "Tu saldo actual es de $ "+ cuentas[idUsuario]["saldo"];
      saldoFinalO3.style.display = 'block';
      document.getElementById("tablaUsuarios").innerHTML= crearTabla(cuentas);
    }
    disminuirSaldo.value == "";
  }
}

function SalirRM()
{
  document.getElementById("op3").style.display = 'none';
  saldoFinalO3.innerHTML = "";
  saldoFinalO3.style.display = 'none';
}

function Salir()
{
  alert("Gracias por utilizar la aplicacion");
  document.getElementById("menuMain").style.display = 'none';
  document.getElementById("menu").style.display = 'none';
  document.getElementById("panelLogSign").style.display = 'flex';
  document.getElementById("panelLogSign").style.justifyContent = 'flex-end';
}

function LimpiarSignIn()
{
  dni.value = "";
  nombre.value = "";
  password.value = "";
  saldo.value = "";
}

function LimpiarLogIn()
{
  dniL.value = "";
  passwordL.value = "";
}


