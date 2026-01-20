import bannerPic from './assets/bannerPic.jpg'
import Navbar from './components/landingPage/navbar/Navbar'
import './App.css'
import Banner from './components/landingPage/mainBanner/Banner'
import HotelSection from './components/landingPage/hotelSection/HotelSection'
import ActivitySection from './components/landingPage/activitySection/ActivitySection'
import Footer from './components/landingPage/footer/Footer'

function App() {
  return (
    <>
      <div
        className="fixed-bg"
        style={{
          backgroundImage: `url(${bannerPic})`
        }}
      />
      <div className="app-content">
        <Navbar />
        <Banner />
        <HotelSection />
        <ActivitySection />
        <Footer />
      </div>
    </>
  )
}

export default App
