import React, { useState } from 'react';
// import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
// import MapComponet from '../components/MapComponet';
import AboutUs from '../components/AboutUs';
import Facts from "../components/Facts";
import { Route, Routes } from 'react-router-dom';
import MarketPricing from '../components/MarketPricing';
import ActivityCalendar from '../components/ActivityCalendar';
import WeatherApp from '../components/WeatherApp';
//import pestDiseaseData from '../components/PestDiseaseMgt';

const Home = () => {
  // const [selectedDistrict, setSelectedDistrict] = useState("");
  const [setSelectedCrop] = useState("");


  return (
    <div>
      <div className="relative">
      {/* <HeroSection handleDistrictClick={handleDistrictClick} /> */}
      <HeroSection setSelectedCrop={setSelectedCrop} />
      {/* <ActivityCalendar selectedCrop={selectedCrop} /> */}
        <div className="mt-10">
        {/* {selectedDistrict && <MapComponet showMap={true} />} */}
          {<AboutUs />}
          {<Facts />}
        </div>
      </div>
      <Routes>
        <Route path="/market" element={<MarketPricing />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/calendar" element={<ActivityCalendar />} />
        <Route path="/pests" element={<pestDiseaseData />} />
      </Routes>
    </div>
  );
};

export default Home;
