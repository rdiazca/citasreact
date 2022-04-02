import { useState, Fragment } from "react";

function Formulario(){
 
  //el valor de inicio va a ser un objeto y se representa useState({})
  const [cita, actualizarCita] = useState({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',

  });

  const actualizarState = (e) => {
    actualizarCita({
      ...cita,  //crear copia para no perder lo que no voy a modificar
      [e.target.name] : e.target.value //asignar al string mascota del state el valor del input mascota
    })

  }
  console.log(cita);

  return(
    <Fragment>
      <h2>Crear Cita</h2>

      <form>
        <label>Nombre Mascota</label>
          <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota" 
          onChange={actualizarState}
          />

          <label>Nombre Dueño</label>
          <input 
           type="text" 
           name="propietario"
           className="u-full-width"  
           placeholder="Nombre Dueño de la Mascota" 
           onChange={actualizarState}
          />

          <label>Fecha</label>
            <input 
             type="date" 
             className="u-full-width"
             name="fecha"
             onChange={actualizarState}
            />               

            <label>Hora</label>
             <input 
              type="time" 
              className="u-full-width"
              name="hora" 
              onChange={actualizarState}
             />

              <label>Síntomas</label>
              <textarea 
              className="u-full-width"
              name="sintomas"
              onChange={actualizarState}
              ></textarea>

              <button type="submit" className="button-primary u-full-width">Agregar</button>
              </form>
     </Fragment>
  )
}

function App() {

  //useState retorna 2 funciones
  //1-El state actual = this.state
  //2-Función que actualiza el state this.setState()
  const [citas, guardarCita] = useState([]);

  return(
    <Fragment>
      <h1> Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario />
          </div>
          <div className="one-half column">

          </div>


        </div>
      </div>

    </Fragment>
  )
}

export default App;
