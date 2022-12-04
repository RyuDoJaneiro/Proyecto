import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import video from '../assets/video.mp4'

const LandingPage = () => 
{
  return(
        <>
        <Navbar/>
        <div>
                <div id='landing-text'>
                  <h1 id='titleText'>MediCare</h1>
                  <p id="subtitleText">❝ Valoramos su tiempo como si fuese nuestro ❞</p>
                </div>
                <video id="landing-video" src={video} autoPlay loop muted></video>
        </div>
        <Footer/>
        </>
  )
}

export default LandingPage