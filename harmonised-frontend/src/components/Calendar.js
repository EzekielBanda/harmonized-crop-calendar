import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Calendar = () => {
    const [month, setMonth] = useState("");
    const [activities, setActivities] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCrop = queryParams.get('crop');

    useEffect(() => {
        const fetchActivities = async () => {
            if (month && selectedCrop) {
                try {
                    const response = await axios.get(`/activities/${selectedCrop}/${month}`); // Assuming your API endpoint is /activities/:crop/:month
                    setActivities(response.data.activities);
                } catch (error) {
                    console.error('Error fetching activities:', error);
                }
            }
        };

        fetchActivities(); // Fetch activities when month or crop changes

    }, [month, selectedCrop]); // Include month and selectedCrop in dependency array

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 from-gray-800 to-gray-700">
            <div className="w-full md:w-1/2 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
                <h1 className="text-3xl mb-4 text-center text-gray-800">Crop Calendar</h1>

                {/* Title animation */}
                <div className="overflow-hidden relative mb-4">
                    <h2 className="absolute top-0 left-0 animate-marquee text-xl text-gray-700">
                        Select Month
                    </h2>
                </div>

                {/* Month selection */}
                <div className="flex flex-col space-y-4">
                    <label htmlFor="month" className="text-lg text-gray-800">Select Month:</label>
                    <select
                        id="month"
                        value={month}
                        onChange={handleMonthChange}
                        className="w-full rounded-lg border border-gray-400 p-2"
                    >
                        <option value="">Select Month</option>
                        {Object.keys(months).map((m) => (
                            <option key={m} value={m}>{months[m]}</option>
                        ))}
                    </select>
                </div>

                {/* Selected Month Display */}
                {month && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Selected Month: {month}</h2>
                        {/* Activities */}
                        {activities.length > 0 ? (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Activities for {selectedCrop} in {month}</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {activities.map((activity, index) => (
                                        <div key={index} className="border border-gray-300 rounded-md p-2">{activity}</div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold text-gray-800">No activities found for {selectedCrop} in {month}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const months = {
    "January": "January",
    "February": "February",
    "March": "March",
    "April": "April",
    "May": "May",
    "June": "June",
    "July": "July",
    "August": "August",
    "September": "September",
    "October": "October",
    "November": "November",
    "December": "December",
};

export default Calendar;
