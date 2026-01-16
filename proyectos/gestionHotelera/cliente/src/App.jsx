import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/landingPage/navbar/Navbar'
import './App.css'
import Banner from './components/landingPage/mainBanner/Banner'
import HotelSection from './components/landingPage/hotelSection/HotelSection'
import ActivitySection from './components/landingPage/activitySection/ActivitySection'

function App() {

  return (
    <div style={{display: 'flex', flexDirection:'column', padding: 0, margin: 0, width: '100%'}}>
      <Navbar/>
      <Banner/>
      <HotelSection/>
      <ActivitySection/>
    </div>
  )
}

export default App
