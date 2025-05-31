// Variable contador para llevar el control de la posicion dentro del carrusel
let contador = 0;

// Arreglo de imagenes
let imagenes = [{
  posicion: "1 de 5",
  imagen: "./images/laptop_encendida.jpeg",
  descripcion: "Laptop encendida",
}, {
  posicion: "2 de 5",
  imagen: "./images/circuito_electronico.jpeg",
  descripcion: "Circuito electrónico",
},{
  posicion: "3 de 5",
  imagen: "./images/programacion_java.jpeg",
  descripcion: "Programación Java",
},{
  posicion: "4 de 5",
  imagen: "./images/persona_con_laptop.jpeg",
  descripcion: "Persona usando MacBook Pro",
},{
  posicion: "5 de 5",
  imagen: "./images/mujer_usando_laptop.jpeg",
  descripcion: "Mujer usando Laptop",
}];

// Referencias a los botones
retroceder = document.getElementById("boton-retroceder");
avanzar = document.getElementById("boton-avanzar");

// Eventos
retroceder.addEventListener("click", () => {
  empezarTiempo();
  evaluarDirecciones(false);
});

avanzar.addEventListener("click", () => {
  empezarTiempo();
  evaluarDirecciones(true);
});

// Variables. direccion es la direccion imagen nueva y direccion2 es la direccion imagen vieja
let direccion = "";
let direccion2 = "";

/** 
* @function evaluarDirecciones
* @description Función que evalua la direccion de la imagen nueva y la imagen vieja, ambas direcciones contrarias
* @returns {void}
* @params {Boolean} booleano - Si es True se mueve hacia la derecha y si es False se mueve hacia la izquierda
*/

function evaluarDirecciones(booleano = true) {
  switch (booleano){
    case true:
      contador++;
      if(contador >= 5){
        contador = 0;
        direccion = "right";
        break;
      }
      direccion = "left";
      break
    case false:
      if (contador <= 0){
        contador = 5;
        direccion = "left";
      } else {
        direccion = "right";
      }
      contador--;
      break
  }
  if (direccion === "left"){
    direccion2 = "right";
  } else {
    direccion2 = "left";
  }
  desplazarElementos();
}

/** 
* @function desplazarElementos
* @description Función que llama a las funciones que desplazan los elementos
* @returns {void}
*/

function desplazarElementos(){
  desplazarIndicadores();
  desplazarImagenVieja();
  desplazarImagenNueva();
}

/** 
* @function desplazarIndicadores
* @description Función que marca el indicador que hace referencia a la imagen actual o nueva
* @returns {void}
*/

function desplazarIndicadores() {
  let indicadores = document.getElementById("indicadores");
  for (let i = 0; i < 5; i++){
    if (i != contador){
      indicadores.children[i].classList.remove("bg-white", "shadow-lg");
      indicadores.children[i].classList.add("bg-white/50");
    } else {
      indicadores.children[i].classList.remove("bg-white/50");   
      indicadores.children[i].classList.add("bg-white", "shadow-lg");
    }
  }
}

/** 
* @function desplazarImagenVieja
* @description Función que se encarga de hacer el efecto de desplazamiento de la imagen vieja
* @returns {void}
*/

function desplazarImagenVieja() {
  let imagen = document.getElementById("imagen");
  imagen.setAttribute("data-aos", `fade-${direccion2}`);
  imagen.setAttribute("data-aos-duration", "500");
}

/** 
* @function desplazarImagenNueva
* @description Función que se encarga de hacer el efecto de desplazamiento de la imagen nueva junto con el texto
* @returns {void}
*/

function desplazarImagenNueva() {
  // Obtenemos los elementos necesarios del objeto imagenes
  let indice = imagenes[contador].imagen;
  let descripcion = imagenes[contador].descripcion;
  let posicion = imagenes[contador].posicion;
  
  // Obtenemos los elementos necesarios del HTML
  let descripcionHtml = document.getElementById("descripcion");
  let posicionHtml = document.getElementById("posicion");
  let contenedor = document.getElementById("contenedor");

  // Desplazamos la nueava imagen
  setTimeout(() => {  
    contenedor.innerHTML = `<img id="imagen" data-aos="fade-${direccion}" data-aos-duration="600" class="md:min-h-[384px] lg:min-h-[500px] w-full  h-[256px] rounded-2xl" src="${indice}" alt="">`;  
  }, 400);
  // Se elimina el código que hace el efecto a fin de que luego se le pueda aplicar un nuevo efecto
  setTimeout(() => {
    contenedor.innerHTML = `<img id="imagen" class="md:min-h-[384px] lg:min-h-[500px] w-full  h-[256px] rounded-2xl" src="${indice}" alt="">`;  
  }, 700);

  // Desplazamos el texto
  descripcionHtml.innerHTML = descripcion;
  posicionHtml.innerHTML = posicion;
}
// Variavle para representar el intervalo de tiempo entre las transiciones de las imagenes
let identificadorTiempo;

/** 
* @function empezarTiempo
* @description Función que se encarga de iniciar y reiniciar el intervalo de tiempo de las transiciones
* @returns {void}
*/

function empezarTiempo() {
  clearInterval(identificadorTiempo);
  identificadorTiempo = setInterval(evaluarDirecciones, 5000);
}

empezarTiempo();