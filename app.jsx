let preguntas = [{
      pregunta: `¿Cuál es la aerolínea más antigua del mundo?`,
      opciones: ["Avianca", "KLM", "Qantas"],
      correcta: "KLM",
      imagen: "img/plane.svg"
},
{
      pregunta: `¿Cuál es el puerto más grande del mundo?`,
      opciones: ["Puerto de Singapur", "Puerto de Rotterdam", "Puerto de Shangai"],
      correcta: "Puerto de Shangai",
      imagen: "img/ship.svg"
},
{
      pregunta: `¿Cuál es la distancia más larga en bicicleta hacia atrás?`,
      opciones: ["89.30 km", "675.10 km", "337.60 km" ],
      correcta: "337.60 km",
      imagen: "img/bycicle.svg"
},
{
      pregunta: `¿Cuál es la velocidad más alta alcanzada nunca por un autobús escolar?`,
      opciones: ["590 km/h", "320 km/h", "245 km/h"],
      correcta: "590 km/h",
      imagen: "img/bus.svg"
},
{
      pregunta: `¿Cuál es el viaje más largo con un tanque de gas?`,
      opciones: ["2,617 km", "3,568 km", "1,732 km" ],
      correcta: "2,617 km",
      imagen: "img/car.svg"
}
];



class Model {

   constructor () {
      this.render = undefined;
      this.preguntas = preguntas;
      this.respuestas = [];
      this.correctas = 0;
      this.preguntaActual = 0; 
   }
  
   subscribe(render) {
      this.render = render;
   }
   inform() {
      this.render();
   }
   siguiente(){
         if(this.preguntas.length >= this.preguntaActual){
            this.preguntaActual = this.preguntaActual + 1;  
         } else{
               
         }
         this.inform();
   }
   seleccionar(e){
            let respuesta = e.target.id;
            for( let i in this.preguntas[this.preguntaActual].opciones){
                  if(respuesta == i){
                        this.respuestas.push(this.preguntas[this.preguntaActual].opciones[i])
                        console.log(this.respuestas); 
                  }
            }
         this.siguiente();
   }
}

const App = ({ title, model }) => {
      const items = model.preguntas[model.preguntaActual].opciones.map((alternativa, index) => {
            return (
               <div>
                  <button id={index} onClick={e => {model.seleccionar(e)}}>{alternativa}</button>
               </div>
            );
         });

      return (
            <div>
                  <section>
                        <img src={model.preguntas[model.preguntaActual].imagen} alt="imagen"/>
                  </section>
                  <div>
                        <div>{items}</div>
                  </div>
            </div>
      );
};


let model = new Model();
console.log(model);
let render = () => {
   ReactDOM.render(
      <App model={model}  />,
      document.getElementById('container')
   );
};

model.subscribe(render);
render(); 