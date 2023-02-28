import React, { useContext, useEffect, useState } from "react";
import Calendar from 'react-calendar';
import Navbar from "../components/Navbar";
import 'react-calendar/dist/Calendar.css';
import { UserContext } from "../../context/UserContext";
import Modal from "react-bootstrap/Modal"

const Profile = () => {
        const userData = useContext(UserContext);
        const [proffesionals, setProffesionals] = useState([]);
        const [filteredList, setFilteredList] = new useState(proffesionals);
        const [specialty, setSpecialty] = useState('')
        const [selectedProff, setSelectedProff] = useState();
        const [turns, setTurns] = useState([]);

        // Modals
        const [showProff, setShowProff] = useState(false);
        const handleProffClose = () => setShowProff(false);
        const handleProffShow = () => setShowProff(true);

        const [showTurn, setShowTurn] = useState(false);
        const handleTurnClose = () => setShowTurn(false);
        const handleTurnShow = () => setShowTurn(true);

        //Turn data
        const [turnData, setTurnData] = useState({
                turnDate: new Date(),
                turnSchedule: "",
                turnDescription: "",
                turnPacient: userData.userData._id,
                turnDoctor: ""
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

        const getProffesionals = async () => {
                const response = await fetch('http://localhost:4000/users');
                const dataToJson = await response.json();
                if (!response.ok) {
                        return console.log("No se puede traer los profesionales");
                }
                setProffesionals(dataToJson.Users);
                return dataToJson.Users
        }
        
        const getTurns = async () =>
        {
                const response = await fetch("http://localhost:4000/turns");
                const dataToJson = await response.json();
                if (!response.ok) {
                        return console.log("No se puede traer a los profesionales");
                }
                setTurns(dataToJson)
                return dataToJson

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

        React.useEffect(() => {
                getTurns()
        }, []);

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
                console.log(dataToJson);
        }

        return (
                <>
                        <Navbar />
                        <div>
                                <img id="profileBanner" />
                                <div id="profileData">
                                        <img id="userAvatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                        <h2>{userData.userData.userName}</h2>
                                        <h3 id="specialText">{userData.userSpecialty}</h3>
                                </div>
                                <div>
                                        <div id="turnsContainer">
                                                {turns.map(turn => (
                                                        <div className="turnDiv" key={turn._id}>
                                                                <h1>Fecha</h1>
                                                                <p>{turn.turnDate}</p>
                                                                <h1>Horario</h1>
                                                                <p>{turn.turnSchedule}</p>
                                                                <p>Descripción</p>
                                                                <p className="turnDescription">{turn.turnDescription}</p>
                                                        </div>
                                                ))}
                                        </div>
                                        <button id="calendarButton" type="button" onClick={handleProffShow}>Pedir turno</button>
                                </div>
                                
                                        
                                        
                                        <Modal show={showProff} onHide={handleProffClose} size='lg' centered>
                                                <Modal.Header closeButton>
                                                        <Modal.Title>Buscar profesionales</Modal.Title>
                                                        <select id="filterSelect"
                                                                onChange={filterBySearch}>
                                                                <option disabled>-- Selecciona una opción --</option>
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
                                                                        setSelectedProff(document.getElementById("proffesionalName").innerText);
                                                                        setTurnData({turnDate: new Date(),
                                                                        turnSchedule: "",
                                                                        turnDescription: "",
                                                                        turnPacient: userData.userData._id,
                                                                        turnDoctor: document.getElementById("proffesionalData").getAttribute("data-value")});
                                                                }}>
                                                                <img id="proffesionalAvatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                                                <h2 id="proffesionalName">{proffesional?.userName}</h2>
                                                                <h3 id="proffesionalSpecialty">{proffesional?.userSpecialty}</h3>
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
                                                                <button type="submit">Enviar turno</button>
                                                        </form>
                                                </Modal.Body>
                                        </Modal>
                                

                        </div>
                </>
        )
}

export default Profile;