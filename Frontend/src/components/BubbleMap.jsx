import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import axios from "axios";

const BubbleMap = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = userData?.token;

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get("http://localhost:5557/farmer/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFarmers(response.data.data);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    fetchFarmers();
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getNearbyCount = (farmer) => {
    let count = 0;
    farmers.forEach((other) => {
      if (
        farmer._id !== other._id &&
        farmer.latitude &&
        farmer.longitude &&
        other.latitude &&
        other.longitude &&
        getDistance(farmer.latitude, farmer.longitude, other.latitude, other.longitude) < 2
      ) {
        count++;
      }
    });
    return count;
  };

  const getBubbleColor = (count) => {
    if (count >= 5) return "#D80000";
    if (count >= 3) return "#FF8C00";
    if (count >= 2) return "#FFD700";
    return "#007BFF";
  };

  const getBubbleSize = (count) => {
    if (count >= 5) return 12000;
    if (count >= 3) return 9000;
    if (count >= 2) return 7000;
    return 5000;
  };

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">📍 Disease Locations</h2>
      <div className="relative w-full h-[500px]">
        <MapContainer
          center={[7.8731, 80.7718]}
          zoom={7}
          className="w-full h-full rounded-lg shadow-lg"
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {farmers.map((farmer, index) => {
            if (!farmer.latitude || !farmer.longitude) return null;

            const nearbyCount = getNearbyCount(farmer);
            const bubbleColor = getBubbleColor(nearbyCount);
            const bubbleSize = getBubbleSize(nearbyCount);

            return (
              <Circle
                key={index}
                center={[farmer.latitude, farmer.longitude]}
                radius={bubbleSize}
                fillColor={bubbleColor}
                fillOpacity={0.7}
                stroke={false}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{farmer.fullname}</h3>
                    <p><strong>Plant:</strong> {farmer.plantName}</p>
                    <p><strong>Disease:</strong> {farmer.diseaseName}</p>
                    <p><strong>Location:</strong> {farmer.location}</p>
                    <p><strong>Nearby Farmers:</strong> {nearbyCount}</p>
                  </div>
                </Popup>
              </Circle>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default BubbleMap;
