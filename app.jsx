let preguntas = [
      {
            pregunta: `¿Cuál es la aerolínea más antigua del mundo?`,
            opciones: [
                  "Avianca", "KLM", "Qantas"
            ],
            correcta: "KLM",
            imagen: "img/plane.svg"
      }, {
            pregunta: `¿Cuál es el puerto más grande del mundo?`,
            opciones: [
                  "Puerto de Singapur", "Puerto de Rotterdam", "Puerto de Shangai"
            ],
            correcta: "Puerto de Shangai",
            imagen: "img/ship.svg"
      }, {
            pregunta: `¿Cuál es la distancia más larga en bicicleta hacia atrás?`,
            opciones: [
                  "89.30 km", "675.10 km", "337.60 km"
            ],
            correcta: "337.60 km",
            imagen: "img/bycicle.svg"
      }, {
            pregunta: `¿Cuál es la velocidad más alta alcanzada nunca por un autobús escolar?`,
            opciones: [
                  "590 km/h", "320 km/h", "245 km/h"
            ],
            correcta: "590 km/h",
            imagen: "img/bus.svg"
      }, {
            pregunta: `¿Cuál es el viaje más largo con un tanque de gas?`,
            opciones: [
                  "2,617 km", "3,568 km", "1,732 km"
            ],
            correcta: "2,617 km",
            imagen: "img/car.svg"
      }
];

class Model {

      constructor() {
            this.render = undefined;
            this.preguntas = preguntas;
            this.respuestas = [];
            this.correctas = 0;
            this.preguntaActual = 0;
            this.respondido = false;
      }

      subscribe(render) {
            this.render = render;
      }
      inform() {
            this.render();
      }
      siguiente() {
            if (this.preguntas.length > this.preguntaActual + 1) {
                  this.preguntaActual = this.preguntaActual + 1;
            } else if (this.preguntas.length == this.respuestas.length) {
                  this.respondido = true;
            }
            
            this.inform();
      }
      seleccionar(e) {
            let respuesta = e.target.id;
            for (let i in this.preguntas[this.preguntaActual].opciones) {
                  if (respuesta == i) {
                        this.respuestas.push(this.preguntas[this.preguntaActual].opciones[i]);
                  }
            }
            this.contarCorrectas();
            this.inform();
            let t = setTimeout(
                  ()=>{this.siguiente()}, 900
            )
      }
      contarCorrectas() {
            if (this.respuestas[this.preguntaActual] == this.preguntas[this.preguntaActual].correcta) {
                  this.correctas = this.correctas + 1;
            }
      }
}

const App = ({title, model}) => {
      const items = model.preguntas[model.preguntaActual].opciones.map((alternativa, index) => {
                  return (
                        <div>
                              <button
                                    id={index}
                                    onClick={e => {
                                    model.seleccionar(e)
                              }}>{alternativa}</button>
                        </div>
                  );
            });

      return (
            <div>
                  <section>
                        {!model.respondido && <img src={preguntas[model.preguntaActual].imagen} />}
                        {model.respondido && <img src="img/truck.svg"/>} 
                  </section>
                  
                  {!model.respondido &&  
                        <div>
                              <h1>{model.preguntas[model.preguntaActual].pregunta}</h1>
                              <div>{model.respuestas.length} de {model.preguntas.length} preguntas contestadas</div>
                              <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: model.respuestas.length * 20 + '%', height: '10px' }}>
                                    </div>
                              </div>
                              <div>{items}</div>
                        </div>
                  }
                  {model.respondido && 
                  <div>
                        <h1>
                              Estas son tus respuestas
                        </h1>
                        <div>{model.respuestas.length} de {model.preguntas.length} preguntas contestadas</div>
                              <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: model.respuestas.length * 20 + '%', height: '10px' }}>
                                    </div>
                              </div>
                  </div>
                  }
            </div>
      );
}

let model = new Model();
console.log(model);
let render = () => {
      ReactDOM.render(
            <App model={model}/>, document.getElementById('container'));
};

model.subscribe(render);
render();