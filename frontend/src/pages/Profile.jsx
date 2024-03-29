import React, { useContext, useEffect, useState } from "react";
import Calendar from 'react-calendar';
import Navbar from "../components/Navbar";
import 'react-calendar/dist/Calendar.css';
import { UserContext } from "../../context/UserContext";
import Modal from "react-bootstrap/Modal"

const Profile = () => {
        const userData = useContext(UserContext);
        const [isProff, setIsProff] = useState();
        const [proffesionals, setProffesionals] = useState([]);
        const [filteredList, setFilteredList] = new useState(proffesionals);
        const [specialty, setSpecialty] = useState('')
        const [selectedProff, setSelectedProff] = useState();
        const [turns, setTurns] = useState([]);
        const [showMessage, setShowMessage] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        // User data
        const [name, setName] = useState();
        const [userSpecialty, setUserSpecialty] = useState();
        const [userId, setUserId] = useState();

        // Modals
        const [showProff, setShowProff] = useState(false);
        const handleProffClose = () => setShowProff(false);
        const handleProffShow = () => setShowProff(true);

        const [showTurn, setShowTurn] = useState(false);
        const handleTurnClose = () => setShowTurn(false);
        const handleTurnShow = () => setShowTurn(true);

        //Turn data
        const [turnData, setTurnData] = useState({
                turnDate: "",
                turnSchedule: "",
                turnDescription: "",
                turnPacient: userData.userData._id,
                turnDoctor: "",
                pacientName: userData.userData.userName,
                doctorName: selectedProff
        });

        function handleInputChange(event)
        {
                setTurnData({
                        ...turnData,
                        [event.target.name] : event.target.value
                })
        }

        useEffect(() => {
          fetch(`http://localhost:4000/users/${specialty}`)
        }, [specialty])
        
        React.useEffect(() => {
                if (userData.userData.userName != null)
                {
                        window.localStorage.setItem('USER_SESSION', JSON.stringify(userData))
                }
        }, [userData]);

        React.useEffect(() => {
                const data = window.localStorage.getItem('USER_SESSION');
                if (data !== null)
                {
                        InitializeFields(data);
                }
        }, []);

        const InitializeFields = (data) =>
        {
                const localUserData = JSON.parse(data);
                setName(localUserData.userData.userName);
                setUserSpecialty(localUserData.userData.userSpecialty);
                setIsProff(localUserData.userData.userSpecialty !== "" ? true : false);
                setUserId(localUserData.userData._id);
                getTurns(localUserData.userData._id)
        }

        const getProffesionals = async () => {
                const response = await fetch('http://localhost:4000/users');
                const dataToJson = await response.json();
                if (!response.ok) {
                        return console.log("No se puede traer los profesionales");
                }
                setProffesionals(dataToJson.Users);
                return dataToJson.Users
        }
        
        const getTurns = async (id) =>
        {
                try{
                        const response = await fetch(`http://localhost:4000/turns/${id}`);
                        const dataToJson = await response.json();
                        if (!response.ok) {
                                return console.log("No se puede traer los turnos");
                        } else {
                        setTurns(dataToJson)
                        setIsLoading(false)
                        }
                } catch (error)
                {
                        console.log(error)
                }
                
        }

        const filterBySearch = (event) =>
        {
                const query = event.target.value;
                var updatedList = proffesionals.filter((proff) => {
                        return proff.userSpecialty == query;
                });
                setFilteredList(updatedList);
        }

        React.useEffect(() => {
                getProffesionals()
        }, [])

        async function handleSubmit(event)
        {
                event.preventDefault();
                const response = await fetch("http://localhost:4000/turn", {
                        method: "POST",
                        mode: "cors",
                        headers: {
                          'Content-Type':'application/json'
                        },
                        body: JSON.stringify(turnData)
                      });
                const dataToJson = response.json();
                if (response.ok)
                {
                        console.log(dataToJson);
                        handleAlert();
                }
        }

        function handleAlert()
        {
                setShowMessage(true);
                setTimeout(() =>
                {
                        setShowMessage(false);
                }, 3000)
        }

        return (
                <>
                        <Navbar />
                        <div>
                                <img id="profileBanner" />
                                <div id="profileData">
                                        <img id="userAvatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                        <h2>{name}</h2>
                                        <h3 id="specialText">{userSpecialty}</h3>
                                </div>
                                <div>
                                        <div id="turnsContainer">
                                                {
                                                        !isLoading ?
                                                        Array.isArray(turns) ? turns.map(turn => (
                                                                <div className="turnDiv" key={turn._id}>
                                                                        <p className="turnTittle">Doctor</p>
                                                                        <p>{turn.doctorName}</p>
                                                                        <p className="turnTittle">Fecha</p>
                                                                        <p>{turn.turnDate.split("T")[0]}</p>
                                                                        <p className="turnTittle">Horario</p>
                                                                        <p>{turn.turnSchedule}</p>
                                                                        <p className="turnTittle">Descripción</p>
                                                                        <p className="turnDescription">{turn.turnDescription}</p>
                                                                </div>
                                                        )) : null
                                                        : null
                                                }
                                        </div>
                                        {!isProff ? <button id="calendarButton" type="button" onClick={handleProffShow}>Pedir turno</button> : (null)}
                                </div>
                                
                                        
                                        
                                        <Modal show={showProff} onHide={handleProffClose} size='lg' centered>
                                                <Modal.Header closeButton>
                                                        <Modal.Title>Buscar profesionales</Modal.Title>
                                                        <select id="filterSelect"
                                                                onChange={filterBySearch}>
                                                                <option disabled>-- Selecciona una opción --</option>
                                                                <option>Clínico</option>
                                                                <option>Traumatólogo</option>
                                                                <option>Dentista</option>
                                                                <option>Dermatólogo</option>
                                                                <option>Pediatra</option>
                                                        </select>
                                                </Modal.Header>
                                                <Modal.Body>
                                                        {filteredList.map(proffesional => (
                                                                <div id="proffesionalData" data-value={proffesional._id} key={proffesional._id} onClick={(event) => {
                                                                        handleTurnShow();
                                                                        setSelectedProff(event.target.innerText.split("\n")[0]);
                                                                        
                                                                        setTurnData({turnDate: new Date(),
                                                                        turnSchedule: "",
                                                                        turnDescription: "",
                                                                        turnPacient: userData.userData._id,
                                                                        turnDoctor: event.target.getAttribute("data-value"),
                                                                        pacientName: userData.userData.userName,
                                                                        doctorName: event.target.innerText.split("\n")[0]})
                                                                }}>
                                                                <img id="proffesionalAvatar" onClick={(event) => {event.stopPropagation()}} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                                                <h2 id="proffesionalName" onClick={(event) => {event.stopPropagation()}}>{proffesional?.userName}</h2>
                                                                <h3 id="proffesionalSpecialty" onClick={(event) => {event.stopPropagation()}}>{proffesional?.userSpecialty}</h3>
                                                                </div>
                                                        ))}
                                                </Modal.Body>
                                        </Modal>

                                        <Modal show={showTurn} onHide={handleTurnClose} size='lg' centered>
                                                <Modal.Header closeButton>
                                                                <Modal.Title>Información del turno</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                        <form onSubmit={handleSubmit}>
                                                                <div id="turnDoctorInfo">
                                                                        <p>Doctor</p>
                                                                        <p>{selectedProff}</p>
                                                                </div>
                                                                <div id="turnSchedule">
                                                                        <p>Horario</p>
                                                                        <select onChange={handleInputChange} name="turnSchedule">
                                                                                <option disabled>-- AM --</option>
                                                                                <option>8:00 AM a 8:30 AM</option>
                                                                                <option>8:30 AM a 9:00 AM</option>
                                                                                <option>9:30 AM a 10:00 AM</option>
                                                                                <option>10:00 AM a 10:30 AM</option>
                                                                                <option disabled>-- PM --</option>
                                                                                <option>17:00 PM a 17:30 PM</option>
                                                                                <option>17:30 PM a 18:00 PM</option>
                                                                                <option>18:00 PM a 18:30 PM</option>
                                                                                <option>18:30 PM a 19:00 PM</option>
                                                                        </select>
                                                                </div>
                                                                <input onChange={handleInputChange} name="turnDate" type="date" required min={new Date().toISOString().split('T')[0]}/>
                                                                <textarea onChange={handleInputChange} name="turnDescription" id="turnDescription" placeholder="Descripción del turno"></textarea>
                                                                <Modal.Footer>
                                                                        {showMessage ? <p id="turnMessage">Turno enviado correctamente</p> : (null)}
                                                                        <button id="submitTurn" type="submit">Enviar turno</button>
                                                                </Modal.Footer>
                                                        </form>
                                                </Modal.Body>
                                        </Modal>
                                

                        </div>
                </>
        )
}

export default Profile;