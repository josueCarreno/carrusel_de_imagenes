let contador = 0;

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

retroceder = document.getElementById("boton-retroceder");
avanzar = document.getElementById("boton-avanzar");

retroceder.addEventListener("click", () => {
  desplazarImagen(false);
});

avanzar.addEventListener("click", () => {
  desplazarImagen(true);
});

function desplazarImagen(booleano = true){
  let direccion = "";
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
      console.log(contador);
      if (contador <= 0){
        contador = 5;
        direccion = "left";
      } else {
        direccion = "right";
      }
      contador--;
      break
  }
  let indice = imagenes[contador].imagen;
  let descripcion = imagenes[contador].descripcion;
  let posicion = imagenes[contador].posicion;
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
  document.getElementById("contenedor").innerHTML = `<img id="imagen" data-aos="fade-${direccion}" data-aos-duration="1000" class="md:min-h-[384px] lg:min-h-[500px] w-full max-w-[896px]  h-[256px] rounded-2xl" src="${indice}" alt="">`;  
  document.getElementById("descripcion").innerHTML = descripcion;
  document.getElementById("posicion").innerHTML = posicion;
  
}

setInterval(desplazarImagen, 5000);