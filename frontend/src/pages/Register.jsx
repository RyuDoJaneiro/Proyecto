import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPasswordConfirm: "",
    userSpecialty: ""
  })

  function handleInputChange(event) {
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/user", 
    {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    const dataToJson = await response.json();
    console.log(dataToJson);
    navigate("/login");
  }

  return (
        <>
        <Navbar/>
        <div>
                <fieldset>
                <form id="register-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="UserInput-register" className="form-label">Nombre de usuario</label><br/>
                      <input onChange={handleInputChange} type="text" name='userName' id="UserInput-register" aria-describedby="emailHelp"/>
                      {false ? (
                        <select onChange={handleInputChange} id="selectInput-register" name='userSpecialty'>
                        <option disabled defaultValue>Especialidad</option>
                        <option disabled>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</option>
                        <option>Clínico</option>
                        <option>Traumatólogo</option>
                        <option>Dentista</option>
                        <option>Dermatólogo</option>
                        <option>Pediatra</option>
                      </select>
                      ) : (null)}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="EmailInput-register" className="form-label">Correo electrónico</label><br/>
                      <input onChange={handleInputChange} type="email" name='userEmail' id="EmailInput-register" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="PasswordInput-register" className="form-label">Contraseña</label><br/>
                      <input onChange={handleInputChange} type="password" name='userPassword' id="PasswordInput-register"></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="PasswordInput-register" className="form-label">Confirmar Contraseña</label><br/>
                      <input onChange={handleInputChange} type="password" id="PasswordInput1-register" name="userPasswordConfirm"></input>
                    </div>  
                    <button type="submit" id='ButtonSubmit-register'>Enviar</button>
                  </form>
                </fieldset>
        </div>
        <Footer/>
        </>
  )
}