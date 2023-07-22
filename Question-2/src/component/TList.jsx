// src/components/TrainList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://api.example.com/trains';
    const authToken = 'YOUR_AUTH_TOKEN';

    axios.get(apiUrl, { headers: { Authorization: `Bearer ${authToken}` } }).then((response) => {
        const sortedTrains = response.data.sort((a, b) => a.price - b.price);
        setTrains(sortedTrains);
      })
      .catch((error) => {
        console.error('Error fetching train data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Trains - Scheduling</h1>
      
      <ul>
        {trains.map((train) => (
          <li key={train.id}>{train.name} - Ticket Fare: ${train.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
