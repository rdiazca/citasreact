import { useState } from "react";

function App() {

  //useState retorna 2 funciones
  //1-El state actual = this.state
  //2-Función que actualiza el state this.setState()
  const [citas, guardarCita] = useState([]);

  return(
    <h1>Hola</h1>
  )
}

export default App;
