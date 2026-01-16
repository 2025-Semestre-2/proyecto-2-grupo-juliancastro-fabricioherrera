import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Banner from './components/mainBanner/Banner'

function App() {

  return (
    <div style={{display: 'flex', flexDirection:'column', padding: 0, margin: 0, width: '100vw'}}>
      <Navbar/>
      <Banner/>
    </div>
  )
}

export default App
