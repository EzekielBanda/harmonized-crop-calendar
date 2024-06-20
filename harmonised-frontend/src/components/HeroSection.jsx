import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/crop-calendar.jpg";
import CalendarImage from "../assets/download.png";
import { FaMapMarkerAlt, FaCalendar, FaLeaf } from "react-icons/fa";
import api from "../api";

const HeroSection = () => {
  const [epas, setEpas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [epasForSelectedDistrict, setEpasForSelectedDistrict] = useState([]);
  const [selectedEpa, setSelectedEpa] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [crops, setCrops] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/epa");
        setEpas(response.data);
      } catch (error) {
        console.error("Error fetching EPAs:", error);
      }
    };
    fetchData();
  }, []);

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    const epasFiltered = epas.filter((epa) => epa.district_name === district);
    setEpasForSelectedDistrict(epasFiltered);
    setSelectedEpa("");
    setSelectedCrop("");
    setCrops([]);
    setSoilTypes([]);
  };

  const handleEpaChange = async (epaName) => {
    setSelectedEpa(epaName);
    try {
      const cropResponse = await api.get(`/epa/crops/${epaName}`);
      setCrops(cropResponse.data[epaName] || []);
      setSelectedCrop("");

      const soilResponse = await api.get(`/epa_soil_types/${epaName}`);
      setSoilTypes(soilResponse.data.soil_types || []);
    } catch (error) {
      console.error("Error fetching crops or soil types:", error);
      setCrops([]);
      setSoilTypes([]);
    }
  };

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
  };

  const handleViewCalendar = () => {
    navigate("/calendar", { state: { selectedCrop, selectedMonth: new Date() } });
  };

  return (
    <div className="relative mt-0.5 ml-0.5 mr-0.5 h-64 md:h-96 lg:h-90">
      <img src={HeroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover brightness-75" />
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-20 pointer-events-none">
        <div className="flex items-center mb-5">
          <img src={CalendarImage} alt="Small" className="w-16 md:w-24 lg:w-32 h-16 md:h-24 lg:h-32" />
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl ml-4 text-center md:text-left">Crop Calendar</h1>
        </div>
        <p className="text-center text-white font-bold text-sm md:text-base lg:text-lg">
          "Explore The Rhythm Of Nature With Our Harmonized Calendar,
          Simplifying Your Agricultural Planning And Optimizing Yields"
        </p>
      </div>

      <div className="absolute bottom-0 mb-[-32px] left-0 right-0 mx-auto max-w-screen-xl w-full lg:w-auto h-auto shadow-md bg-green-700 lg:py-6 lg:px-10 py-4 px-6 flex flex-col md:flex-row items-center justify-between rounded-md">
        <div className="flex items-center mb-2 md:mb-0">
          <label className="font-bold text-white md:mr-4">District</label>
          <FaMapMarkerAlt className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          <select
            className="rounded-md ml-4 md:ml-2 md:w-48 h-7 pl-2"
            onChange={(e) => handleDistrictClick(e.target.value)}
          >
            <option value="">Select District</option>
            <option value="Zomba">Zomba</option>
            <option value="Blantyre">Blantyre</option>
            <option value="Mulanje">Mulanje</option>
            <option value="Lilongwe">Lilongwe</option>
            <option value="Rumphi">Rumphi</option>
          </select>
        </div>

        <div className="flex items-center mt-2 md:mt-0 md:ml-4">
          <label className="font-bold text-white">EPA</label>
          <FaMapMarkerAlt className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-2 md:ml-2" />
          {epasForSelectedDistrict.length > 0 ? (
            <select
              className="rounded-md ml-2 md:w-48 h-7 pl-2"
              onChange={(e) => handleEpaChange(e.target.value)}
              value={selectedEpa}
            >
              <option value="">Select EPA</option>
              {epasForSelectedDistrict.map((epa) => (
                <option key={epa.epa_id} value={epa.epa_name}>
                  {epa.epa_name}
                </option>
              ))}
            </select>
          ) : (
            <p className="ml-2 text-white">EPAs for {selectedDistrict} are yet to be added.</p>
          )}
        </div>

        <div className="flex items-center mt-2 md:mt-0 md:ml-4">
          <label className="font-bold text-white">CROP</label>
          <FaLeaf className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-2 md:ml-2" />
          <select
            className="rounded-md ml-2 md:w-48 h-7 pl-2"
            value={selectedCrop}
            onChange={(e) => handleCropChange(e.target.value)}
          >
            <option value="">Select Crop</option>
            {crops.map((crop, index) => (
              <option key={index} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        {selectedCrop && (
          <button onClick={handleViewCalendar} className="flex items-center mt-2 md:mt-0 ml-2 md:ml-4 cursor-pointer hover:text-red-300">
            <label className="text-white">View Calendar</label>
            <FaCalendar className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-2 md:ml-2" />
          </button>
        )}
      </div>

      {selectedEpa && soilTypes.length > 0 && (
        <div className="absolute bottom-10 left-0 right-0 mx-auto max-w-screen-xl w-full lg:w-auto h-auto bg-blue-100 lg:py-6 lg:px-10 py-4 px-6 shadow-md rounded-md">
          <h2 className="font-bold text-green-700 mb-2">Soil Types:</h2>
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-green-700">Crop</th>
                <th className="px-4 py-2 text-green-700">Soil Type</th>
              </tr>
            </thead>
            <tbody>
              {soilTypes.map((soilType, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{selectedCrop}</td>
                  <td className="border px-4 py-2">{soilType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
