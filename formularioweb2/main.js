
const firebaseConfig = {
  apiKey: "AIzaSyAecM7BgW8OOtjekH-ULdmKwoAkVUUAapI",
  authDomain: "registroweb-4a2d3.firebaseapp.com",
  projectId: "registroweb-4a2d3",
  storageBucket: "registroweb-4a2d3.appspot.com",
  messagingSenderId: "1012710257644",
  appId: "1:1012710257644:web:14edcc749fa5d2f0abc6c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//LLamando elementos de html o del DOM
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById("contenidoDeLaWeb");
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');



//Funcion Registrar
btnRegistrar.addEventListener('click', () => {
  let email = document.getElementById("txtEmail").value;
  let password = document.getElementById("txtPassword").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Inicio de sesión correcto");
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
      formulario.classList.replace('mostrar', 'ocultar');
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
})

//Funcion  Ingresar
btnIngresar.addEventListener('click', () => {
  let email = document.getElementById("txtEmail").value;
  let password = document.getElementById("txtPassword").value;
  console.log("tu email es" + email + "y tu password es" + password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Inicio de sesión correcto");
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
      formulario.classList.replace('mostrar', 'ocultar');
      var user = userCredential.user;
      console.log("Inicio sesion correctamente")

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
})



//Funcion Cerrar Sesion
btnCerrarSesion.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
    console.log("Cierre de sesion correcto");
  }).catch((error) => {
    console.log("Error con el cierre de Sesion");
  });
})


//Función estado del usuario: activo o inactivo
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
    formulario.classList.replace('mostrar', 'ocultar');
    cargarJSON();
  } else {
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
  }
});


//Funcion Login  con Google
btnGoogle.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {

      var credential = result.credential;
      console.log("Inicio sesion con google");
      cargarJSON();

      // ...
    }).catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("Error de login con google")
      // ...
    });
})


//Llamando datos de Json
function cargarJSON() {
  fetch('data.json')
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let html = '';
      data.forEach((datos) => {
        html += `
           <div class="producto">
             <p> ${datos.marca} </p>
             <img src="${datos.img}" width="50px" class="imgProducto">
             <strong>${datos.precio} </strong>
             </div>
           `;
      });
      document.getElementById('resultado').innerHTML = html
    })
}