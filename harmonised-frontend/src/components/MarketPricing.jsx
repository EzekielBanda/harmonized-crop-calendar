import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChromePicker } from 'react-color';
import jsPDF from 'jspdf';
import { CSVLink } from 'react-csv';

function HarmonizedCalendar() {
  const [crop, setCrop] = useState('');
  const [season, setSeason] = useState('rainy');
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [plantingDate, setPlantingDate] = useState(new Date());
  const [themeColor, setThemeColor] = useState('#4A90E2'); // Default color
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [cropDuration, setCropDuration] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const fetchCalendar = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/get_calendar', { crop, season, planting_date: plantingDate });
      setCalendar(response.data);
      setCropDuration(response.data.length ? response.data[response.data.length - 1].days_offset : null);
    } catch (error) {
      console.error('Error fetching calendar:', error);
    }
    setLoading(false);
  }, [crop, season, plantingDate]);

  useEffect(() => {
    if (crop) {
      fetchCalendar();
    }
  }, [crop, season, plantingDate, fetchCalendar]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Harmonized Crop Calendar', 10, 10);
    doc.text(`Crop: ${crop}`, 10, 20);
    doc.text(`Season: ${season}`, 10, 30);
    doc.text(`Planting Date: ${plantingDate.toDateString()}`, 10, 40);
    doc.text('Calendar:', 10, 50);
    calendar.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.activity} - ${item.date} - ${item.notes || 'No specific notes. Ensure regular monitoring and care.'}`,
        10,
        60 + index * 10
      );
    });
    doc.save('calendar.pdf');
  };

  const exportCSVData = calendar.map(item => ({
    Activity: item.activity,
    Date: item.date,
    Notes: item.notes || 'No specific notes. Ensure regular monitoring and care.'
  }));

  const csvReport = {
    data: exportCSVData,
    filename: 'calendar.csv'
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  // Custom styles for table
  const tableStyles = {
    fontSize: '1.8rem', // Adjust the font size for the table here
  };

  return (
    <div className="container mx-auto p-6" style={{ backgroundColor: themeColor }}>
      <h1 className="text-4xl font-bold mb-4 text-center" style={{ fontSize: '2rem' }}>Harmonized Crop Calendar</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-lg" style={{ fontSize: '2rem' }}>Select Crop:</label>
        <select value={crop} onChange={(e) => setCrop(e.target.value)} className="block w-full mt-1 p-2 border rounded" style={{ fontSize: '2rem' }}>
          <option value="">Select Crop</option>
          <option value="maize">Maize</option>
          <option value="beans">Beans</option>
          <option value="groundnuts">Groundnuts</option>
          <option value="rice">Rice</option>
          <option value="soybeans">Soybeans</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-lg" style={{ fontSize: '2rem' }}>Select Season:</label>
        <select value={season} onChange={(e) => setSeason(e.target.value)} className="block w-full mt-1 p-2 border rounded" style={{ fontSize: '2rem' }}>
          <option value="rainy">Rainy</option>
          <option value="irrigation">Irrigation</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-lg" style={{ fontSize: '2rem' }}>Select Planting Date:</label>
        <DatePicker
          selected={plantingDate}
          onChange={date => setPlantingDate(date)}
          className="block w-full mt-1 p-2 border rounded"
          dateFormat="MMMM d, yyyy"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-500" style={{ fontSize: '2rem' }}>Loading calendar...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg text-center font-bold" style={{ fontSize: '2rem' }}>Crop Duration: {cropDuration ? `1 to ${cropDuration} days` : ''}</label>
          </div>
          <div className="flex mb-4 justify-center">
            {calendar.map((item, index) => (
              <button
                key={index}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2 mb-2"
                style={{ backgroundColor: item.color }}
                onClick={() => handleActivityClick(item)}
              >
                {item.activity}
              </button>
            ))}
          </div>
          {selectedActivity && (
            <table className="min-w-full bg-white border rounded mb-4" style={tableStyles}>
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-lg" style={{ fontSize: '2rem' }}>Activity</th>
                  <th className="py-2 px-4 border-b text-lg" style={{ fontSize: '2rem' }}>Date</th>
                  <th className="py-2 px-4 border-b text-lg" style={{ fontSize: '2rem' }}>Crop Duration</th>
                  <th className="py-2 px-4 border-b text-lg" style={{ fontSize: '2rem' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b" style={{ fontSize: '1.6rem' }}>{selectedActivity.activity}</td>
                  <td className="py-2 px-4 border-b" style={{ fontSize: '1.6rem' }}>{selectedActivity.date}</td>
                  <td className="py-2 px-4 border-b" style={{ fontSize: '1.6rem' }}>{`${selectedActivity.days_offset} days`}</td>
                  <td className="py-2 px-4 border-b" style={{ fontSize: '1.6rem' }}>{selectedActivity.notes || 'No specific notes. Ensure regular monitoring and care.'}</td>
                </tr>
              </tbody>
            </table>
          )}
          <div className="mt-4">
            <h2 className="text-2xl font-bold" style={{ fontSize: '2rem' }}>General Recommendations:</h2>
            <p style={{ fontSize: '2rem' }}>1. Always monitor your crops for signs of pests and diseases.</p>
            <p style={{ fontSize: '2rem' }}>2. Ensure that your soil is well-prepared and fertile before planting.</p>
            <p style={{ fontSize: '2rem' }}>3. Utilize organic fertilizers to improve soil health.</p>
            <p style={{ fontSize: '2rem' }}>4. Implement crop rotation to maintain soil fertility.</p>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={exportPDF} style={{ fontSize: '2rem' }}>
              Export to PDF
            </button>
            <CSVLink {...csvReport}>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" style={{ fontSize: '2rem' }}>
                Export to CSV
              </button>
            </CSVLink>
          </div>
        </>
      )}
      {showColorPicker && (
        <div className="fixed bottom-4 right-4 bg-white p-4 border rounded">
          <ChromePicker color={themeColor} onChangeComplete={(color) => setThemeColor(color.hex)} />
          <button className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full" onClick={() => setShowColorPicker(false)}>X</button>
        </div>
      )}
      <div className="fixed bottom-4 right-4 bg-gray-600 text-white p-2 rounded-full cursor-pointer" onClick={() => setShowColorPicker(true)}>
        <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
}

export default HarmonizedCalendar;
