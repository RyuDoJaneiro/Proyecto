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

        // Modal
        const [showProff, setShowProff] = useState(false);
        const handleProffClose = () => setShowProff(false);
        const handleProffShow = () => setShowProff(true);

        const [showTurn, setShowTurn] = useState(false);
        const handleTurnClose = () => setShowTurn(false);
        const handleTurnShow = () => setShowTurn(true);

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

        function renderSchedule() {
                const scheduleList = [];

                Schedule.scheduleAM.forEach(schedule => {
                        scheduleList.push(
                                <div key={schedule} className="scheduleSet">
                                        <div className="scheduleInfo">
                                                {schedule}
                                        </div>
                                        <div className="arrowDiv">
                                                <img className="arrowIcon" src="https://cdn-icons-png.flaticon.com/512/318/318476.png" />
                                        </div>
                                </div>
                        )
                });
                return (
                        <div>
                                {scheduleList}
                        </div>
                )
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
                                        <Calendar id="profileCalendar"/>

                                        <button id="calendarButton" type="button" onClick={handleProffShow}>Pedir turno</button>
                                        
                                        <Modal show={showProff} onHide={handleProffClose} size='lg' centered>
                                                <Modal.Header closeButton>
                                                        <Modal.Title>Buscar profesionales</Modal.Title>
                                                        <select id="filterSelect"
                                                                onChange={filterBySearch}>
                                                                <option disabled selected>-- Selecciona una opción --</option>
                                                                <option>Traumatólogo</option>
                                                                <option>Dentista</option>
                                                                <option>Dermatólogo</option>
                                                                <option>Pediatra</option>
                                                        </select>
                                                </Modal.Header>
                                                <Modal.Body>
                                                        {filteredList.map(proffesional => (
                                                                <div id="proffesionalData" key={proffesional._id} onClick={(event) => {
                                                                        handleTurnShow();
                                                                        setSelectedProff(document.getElementById("proffesionalName").innerText);
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
                                                                <p>Doctor</p>
                                                                <p>{selectedProff}</p>
                                                                <p>Horario</p>
                                                                <select>
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
                                                </Modal.Body>
                                        </Modal>

                                        <div id="scheduleContainer">
                                                <div id="scheduleMessage">Selecciona un día</div>
                                        </div>
                                </div>

                        </div>
                </>
        )
}

export default Profile;