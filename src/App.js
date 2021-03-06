import { useState, useEffect, Fragment } from "react";

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
        type="button" className="button eliminar u-full-width">Eliminar</button>

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

  //state para mostrar error si hay un campo vacío
  const [error, setError] = useState(false);

  //actualiza el state
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,  //crear copia para no perder lo que no voy a modificar
      [e.target.name] : e.target.value //asignar al string mascota, propietario etc del state el valor del input mascota propietario etc
    })

  }

  const enviarCita = (e) => {
    e.preventDefault(); //se pone siempre que se hace un submit

    if(cita.mascota === '' || cita.propietario === '' || cita.telefono === '' || cita.fecha ==='' || cita.hora === '' || cita.sintomas === ''){
    setError(true)
  }
  else {
    //pasar la cita hacia el componente principal
    crearCita(cita)


    //reiniciar el state (reiniciar el form)
    actualizarCita(stateInicial)
    setError(false)
  }

  } 
  

  return(
    <Fragment>
      <h2>Crear Cita</h2>

      { error ? <div className='alert alert-danger' role='alert'>Todos los campos son obligatorios</div> : null}
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

  //cargar las citas de localStorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

     if(!citasIniciales){
       citasIniciales = [];
     }

  //useState retorna 2 funciones
  //1-El state actual = this.state
  //2-Función que actualiza el state this.setState()
  const [citas, guardarCita] = useState(citasIniciales);

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

  //useEffect se carga cuando el componente se actualiza, detecta cambios y los guarda en localStorage
  useEffect(
    () => {
     let citasIniciales = JSON.parse(localStorage.getItem('citas'));

     if(citasIniciales){
       localStorage.setItem('citas', JSON.stringify(citas));
     }
     else{
        localStorage.setItem('citas', JSON.stringify([]));
     }
  }, [citas] //ejecutar useEffect solo cuando las citas cambien
 )

  

  // imprimir mensaje en base a si hay citas o no
  const mensaje = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administra las citas aquí';

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
            <h2>{mensaje}</h2>
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
