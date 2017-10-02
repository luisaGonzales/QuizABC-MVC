
class Model {

   constructor () {
      this.render = undefined;
   }
  
   subscribe(render) {
      this.render = render;
   }
   inform() {
      console.log(this.todos.map(e => e.text));
      this.render();
   }
}

const App = ({ title, model }) => {

};

let render = () => {
   ReactDOM.render(
      <App title="Quiz" model={model} />,
      document.getElementById('container')
   );
};

model.subscribe(render);
render(); 