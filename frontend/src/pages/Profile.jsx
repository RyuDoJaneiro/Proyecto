import React, { useContext, useEffect, useState } from "react";
import Calendar from 'react-calendar';
import Navbar from "../components/Navbar";
import 'react-calendar/dist/Calendar.css';
import { UserContext } from "../../context/UserContext";
import Modal from "../components/Modal";

const Profile = () => {
        const { userData } = useContext(UserContext);
        const [proffesionals, setProffesionals] = useState([]);
        const [specialty, setSpecialty] = useState('')

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

        React.useEffect(() => {
                getProffesionals()
        }, [])

        const Schedule = {
                scheduleAM: [
                        "8:00 AM a 8:30 AM",
                        "8:30 AM a 9:00 AM",
                        "9:30 AM a 10:00 AM",
                        "10:00 AM a 10:30 AM"
                ],
                schedulePM: [
                        "17:00 PM a 17:30 PM",
                        "17:30 PM a 18:00 PM",
                        "18:00 PM a 18:30 PM",
                        "18:30 PM a 19:00 PM"
                ]
        };

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

        // function renderProffesionals()
        // {
        //         const searchProffesional = proffesionals.filter(proffesional => console.log([proffesional.userSpecialty, specialty]))
        //         console.log(searchProffesional)
        //         searchProffesional.map(proffesional => {
        //                 if (proffesional.userSpecialty.lenth != "")
        //                 {
        //                         return(
        //                                 <div className="profileData col-12 col-md-6 col-lg-3 mx-auto mx-md-2 my-2" key={proffesional._id}>
        //                                         <img className="userAvatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
        //                                         <h2>{proffesional?.userName}</h2>
        //                                         <h3 className="specialText">{proffesional?.userSpecialty}</h3>
        //                                 </div>
        //                         )
        //                 }
        //         })



        // }

        function renderProffesionals() {
                proffesionals && proffesionals.map((proffesional) => {
                        if (proffesional.userSpecialty.length > 0) {
                                return (
                                        <div className="profileData col-12 col-md-6 col-lg-3 mx-auto mx-md-2 my-2" key={proffesional._id}>
                                                <img className="userAvatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                                <h2>{proffesional?.userName}</h2>
                                                <h3 className="specialText">{proffesional?.userSpecialty}</h3>
                                        </div>
                                )
                        }
                })
        }

        return (
                <>
                        <Navbar />
                        <div>
                                <img id="profileBanner" />
                                <div id="profileData">
                                        <img id="userAvatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                        <h2>{userData.userName}</h2>
                                        <h3 id="specialText">{userData.userSpecialty}</h3>
                                </div>
                                <div>
                                        <Calendar id="profileCalendar"/>
                                        <button id="calendarButton" type="button" data-toggle="modal" data-target="#exampleModal1">Pedir turno</button>
                                        <Modal filterSelect={
                                                <select id="filterSelect"
                                                        onChange={(event) => setSpecialty(event.target.value)}>
                                                        <option>Clínico</option>
                                                        <option>Traumatólogo</option>
                                                        <option>Dentista</option>
                                                        <option>Dermatólogo</option>
                                                        <option>Pediatra</option>
                                                </select>
                                        }>
                                                {proffesionals && proffesionals.map((proffesional) => {
                                                        if (proffesional.userSpecialty.length > 0) {
                                                                return (
                                                                        <div id="proffesionalData" key={proffesional._id}>
                                                                                <img id="proffesionalAvatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                                                                <h2 id="proffesionalName">{proffesional?.userName}</h2>
                                                                                <h3 id="proffesionalSpecialty">{proffesional?.userSpecialty}</h3>
                                                                        </div>
                                                                )
                                                        }
                                                })}
                                        </Modal>
                                        <div id="scheduleContainer">
                                                {renderSchedule()}
                                        </div>
                                </div>

                        </div>
                </>
        )
}

export default Profile;