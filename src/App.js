import { useState, Fragment } from "react";

function Cita({cita, index, eliminarCita}){
  return(
    <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Dueño: <span>{cita.propietario}</span></p>
        <p>Teléfono: <span>{cita.telefono}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Síntomas: <span>{cita.sintomas}</span></p>
        <button 
        onClick={() => eliminarCita(index)}
        type="button" className="button eliminar u-full-width">Eliminar X</button>

    </div>
  )
}

function Formulario({crearCita}){

  const stateInicial = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
  }
 
  //cita = state actual
  //actualizarCita = función para cambiar el state
  //el valor de inicio va a ser un objeto y se representa useState({})
  const [cita, actualizarCita] = useState(stateInicial);

  //actualiza el state
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,  //crear copia para no perder lo que no voy a modificar
      [e.target.name] : e.target.value //asignar al string mascota, propietario etc del state el valor del input mascota propietario etc
    })

  }

  const enviarCita = (e) => {
    e.preventDefault(); //se pone siempre que se hace un submit
    console.log(cita);

    //pasar la cita hacia el componente principal
    crearCita(cita)


    //reiniciar el state (reiniciar el form)
    actualizarCita(stateInicial)

  } 
  

  return(
    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={enviarCita}>
        <label>Nombre Mascota</label>
          <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota" 
          onChange={actualizarState}
          value={cita.mascota}
          />

          <label>Nombre Dueño</label>
          <input 
           type="text" 
           name="propietario"
           className="u-full-width"  
           placeholder="Nombre Dueño de la Mascota" 
           onChange={actualizarState}
           value={cita.propietario}
          />

          <label>Teléfono</label>
          <input 
           type="text" 
           name="telefono"
           className="u-full-width"  
           placeholder="Teléfono de contacto" 
           onChange={actualizarState}
           value={cita.telefono}
          />

          <label>Fecha</label>
            <input 
             type="date" 
             className="u-full-width"
             name="fecha"
             onChange={actualizarState}
             value={cita.fecha}
            />               

            <label>Hora</label>
             <input 
              type="time" 
              className="u-full-width"
              name="hora" 
              onChange={actualizarState}
              value={cita.hora}
             />

              <label>Síntomas</label>
              <textarea 
              className="u-full-width"
              name="sintomas"
              onChange={actualizarState}
              value={cita.sintomas}
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

  //agregar las nuevas citas al state
  const crearCita = (cita) => {

    //tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas =  [...citas, cita];

    //almacenar en el state
    guardarCita(nuevasCitas);

  }

  //eliminar las citas del state
  const eliminarCita = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1); //eliminar un elemento a partir del elemento que tiene el índice dado
    guardarCita(nuevasCitas);

  }

  return(
    <Fragment>
      <h1> Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
            {citas.map((cita, index) => (
              <Cita
                key = {index}
                index = {index}
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}

          </div>


        </div>
      </div>

    </Fragment>
  )
}

export default App;
