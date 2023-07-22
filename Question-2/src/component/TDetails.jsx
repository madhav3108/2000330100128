// src/components/TrainDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TDetails = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.example.com/trains/${trainId}`;
    const authToken = 'YOUR_AUTH_TOKEN';
    axios.get(apiUrl, { headers: { Authorization: `Bearer ${authToken}` } }).then((response) => {
        setTrain(response.data);
      })
      .catch((error) => {
        console.error('Error fetching train details:', error);
      });
  }, [trainId]);

  if (!train) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      <p> Train Name: {train.name}</p>
      <p>Train Departure Time: {train.departureTime}</p>
      <p>Train Seat Availability: {train.seatAvailability}</p>
      <p>Ticket Fare: ${train.price}</p>
    </div>
  );
};

export default TDetails;
