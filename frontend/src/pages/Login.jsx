import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export default function Login() {

  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    userPassword: ""
  })
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: raw
  }
  
  function handleInputChange(event){
    setData({
      ...data,
      [event.target.name] : event.target.value
    });
  }

  const { userData, setUserData } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/login", requestOptions)
    const dataToJson = await response.json();
    await setUserData(dataToJson.user);
    if (response.ok) navigate("/profile");
  }
  
  return (
        <>
        <Navbar/>
        <div>
                <fieldset>
                  <form id="login-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="UserInput-login" className="form-label">Nombre de usuario</label><br/>
                      <input onChange={handleInputChange} type="text" id="UserInput-login" aria-describedby="emailHelp" name='userName'/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="PasswordInput-login" className="form-label">Contraseña</label><br/>
                      <input  onChange={handleInputChange} type="password" id="PasswordInput-login" name='userPassword'></input>
                    </div>
                    <button type="submit" id='ButtonSubmit-login'>Enviar</button>
                  </form>
                </fieldset>
        </div>
        <Footer/>
        </>
  )
}