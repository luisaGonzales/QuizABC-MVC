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
            this.revisar = false;
            this.abc = ["A", "B", "C"];
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
            } else if (this.respondido){
                  this.preguntaActual = this.preguntaActual + 1;
            }
            
            this.inform();
      }
      anterior(){
            if (this.preguntas.length != this.respuestas.length) {
                  this.respondido = false;
            }
            this.preguntaActual = this.preguntaActual - 1;
            this.inform();
      }
      seleccionar(e) {
            let respuesta = e.target.id;
            for (let i in this.preguntas[this.preguntaActual].opciones) {
                  if (respuesta == i) {
                        this.respuestas[this.preguntaActual] = this.preguntas[this.preguntaActual].opciones[i];
                  }
            }
            this.contarCorrectas();
            this.inform();
            let t = setTimeout(
                  ()=>{this.siguiente()}, 900
            )
      }
      revisarCuestionario(e){
            this.revisar = true;
            this.inform();
      }
      contarCorrectas() {
            if (this.respuestas[this.preguntaActual] == this.preguntas[this.preguntaActual].correcta) {
                  this.correctas = this.correctas + 1;
            }
      }
      reiniciar(){
            this.respuestas = [];
            this.correctas = 0;
            this.preguntaActual = 0;
            this.respondido = false;
            this.revisar = false;
            this.inform();
      }
}

const App = ({title, model}) => {
      const abc = model.abc.map((abc, index) => {
            console.log(abc);
            return 
                  <div key={index}> 
                        {abc}
                  </div>
      });
      const items = model.preguntas[model.preguntaActual].opciones.map((alternativa, index) => {
                  return (
                        <div className="text-center">
                               <div className= 'col-lg-4 col-md-4 col-sm-4 col-xs-12 seleccionado'>
                              <button
                                    className='btn btn-block btn-abc text-center'
                                    id={index}
                                    onClick={e => {
                                    model.seleccionar(e)
                              }}>{abc} {alternativa}
                              <span className="seleccion"></span>
                              </button>
                              </div>
                        </div>
                  );
            });
      const respuestas = model.respuestas.map((usuario, indexRespuestas) => {
            if (usuario == model.preguntas[indexRespuestas].correcta && model.revisar) {
                  return <p className="text-success">{indexRespuestas + 1}. {model.preguntas[indexRespuestas].pregunta}<strong> {usuario}</strong></p>
            } else if (model.revisar) {
                  return <p className="text-danger">{indexRespuestas + 1}. {model.preguntas[indexRespuestas].pregunta}<strong><strike> {usuario}</strike> {preguntas[indexRespuestas].correcta}</strong></p>
            } else {
                  return <p>{indexRespuestas + 1}. {model.preguntas[indexRespuestas].pregunta}<strong> {usuario}</strong></p>;
            }
      })
      return (
            <div>
                  <section className="container quiz text-center">
                  <div className="row text-center">
                        <div className="col-md-offset-3 col-md-6 col-md-offset-3 ">
                              {!model.respondido && <img src={model.preguntas[model.preguntaActual].imagen} />}
                              {model.respondido && <img src="img/truck.svg"/>} 
                        </div>
                  </div>
                  {!model.respondido &&  
                        <div className="row contenido">
                              <div className="row estado" id="progreso">
                                    <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                                          <div>{model.respuestas.length} de {model.preguntas.length} preguntas contestadas</div>
                                          <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: model.respuestas.length * 20 + '%', height: '10px' }}>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              
                              <div className="col-md-12 col-lg-12 pregunta">
                                    <h1 className="text-center titulo">{model.preguntas[model.preguntaActual].pregunta}</h1>
                                    <div className="opciones row">{items}</div>
                              
                                    <div className="row">
                                          <div className="col-md-offset-3 col-md-6 " id="redesSociales">
                                                <span className="fa-stack fa-lg ">
                                                      <i className="fa fa-circle fa-stack-2x fa-inverse fa-2x twitter"></i>
                                                      <i className="fa fa-twitter fa-stack-1x"></i>
                                                </span>
                                                <span className="fa-stack fa-lg ">
                                                      <i className="fa fa-circle fa-stack-2x fa-inverse fa-2x facebook"></i>
                                                      <i className="fa fa-facebook fa-stack-1x"></i>
                                                </span>
                                                <span className="fa-stack fa-lg ">
                                                      <i className="fa fa-circle fa-stack-2x fa-inverse fa-2x google"></i>
                                                      <i className="fa fa-google-plus fa-stack-1x"></i>
                                                </span>
                                          </div>
                                    </div>
                              </div>
                              
                        </div>
                  }
                  {model.respondido && 
                        <div>
                              <div className="row estado" id="progreso">
                                    <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                                          <div>{model.respuestas.length} de {model.preguntas.length} preguntas contestadas</div>
                                          <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: model.respuestas.length * 20 + '%', height: '10px' }}>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        <div className="col-md-12 col-lg-12 pregunta">
                              <h1 className="titulo">
                                    {!model.revisar && 'Estas son tus respuestas!'}
                                    {model.revisar && model.correctas + ' de ' + model.preguntas.length + ' correctas!!'}
                              </h1>
                              <div>
                                    <span>{respuestas}</span>
                              </div> 
                              <div className='text-center'>
                                    {model.revisar && <button className='btn btn-default btn-lg' onClick={() => model.reiniciar()}>Start Again</button>}
                                    {!model.revisar && <button className='btn btn-default btn-lg' onClick={() => model.revisarCuestionario()}>Enviar</button>}
                              </div>
                        </div>      
                  </div>
                  }
                  
                  {!model.revisar && model.respuestas.length != 0 &&
                        <div id="flechas" className="text-center">
                              <button id="anterior" className={model.respuestas.length >= model.preguntaActual && model.preguntaActual?'btn':"btn disabled"} onClick={()=>{model.anterior()}}>
                                    <img className="img-responsive" src="img/left.svg" />
                              </button>
                              <button id="siguiente" className={model.respuestas.length > model.preguntaActual ? 'btn':"btn disabled"} onClick={()=>{model.siguiente()}} >
                                    <img className="img-responsive" src="img/right.svg" />
                              </button>
                        </div>
                  }
                  </section>
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