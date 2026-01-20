import { Outlet } from "react-router-dom";
import Navbar from "../components/landingPage/navbar/Navbar";
import Footer from "../components/landingPage/footer/Footer";
import bannerPic from "../assets/bannerPic.jpg";

export default function MainLayout() {
  return (
    <>
      <div className="fixed-bg" style={{ backgroundImage: `url(${bannerPic})` }}/>

      <div className="app-content">
        <Navbar />
        <Outlet />
        <Footer />
      </div>

      <style>{`
        .fixed-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .app-content {
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}
