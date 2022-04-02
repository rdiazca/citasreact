import { useState, Fragment } from "react";

function Cita({cita}){
  return(
    <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Dueño: <span>{cita.propietario}</span></p>
        <p>Teléfono: <span>{cita.telefono}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Síntomas: <span>{cita.sintomas}</span></p>

    </div>
  )
}

function Formulario({crearCita}){
 
  //el valor de inicio va a ser un objeto y se representa useState({})
  const [cita, actualizarCita] = useState({
      mascota: '',
      propietario: '',
      telefono: '',
      fecha: '',
      hora: '',
      sintomas: '',

  });

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
          />

          <label>Nombre Dueño</label>
          <input 
           type="text" 
           name="propietario"
           className="u-full-width"  
           placeholder="Nombre Dueño de la Mascota" 
           onChange={actualizarState}
          />

          <label>Teléfono</label>
          <input 
           type="text" 
           name="telefono"
           className="u-full-width"  
           placeholder="Teléfono de contacto" 
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

  //agregar las nuevas citas al state
  const crearCita = (cita) => {

    //tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas =  [...citas, cita];

    //almacenar en el state
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
              />
            ))}

          </div>


        </div>
      </div>

    </Fragment>
  )
}

export default App;
