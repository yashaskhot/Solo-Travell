import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./BookingScreen.css";
import { useNavigate } from 'react-router-dom';
Chart.register(ArcElement, Title, Tooltip, CategoryScale, LinearScale, BarElement);



function RoomDetailsnew() {
  const [roomID, setRoomID] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [adminKeynew, setAdminKeynew] = useState('');
  const [roomData, setRoomData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (roomData.length > 0) {
      // Calculate age and occupation statistics from room data
      const ageStats = {};
      const occupationStats = {};

      roomData[0].forEach((room) => {
        if (room.userDetails && room.userDetails.age) {
          const age = room.userDetails.age;
          ageStats[age] = (ageStats[age] || 0) + 1;
        }
        if (room.userDetails && room.userDetails.occupation) {
          const occupation = room.userDetails.occupation;
          occupationStats[occupation] = (occupationStats[occupation] || 0) + 1;
        }
      });
      
      // Extract check-in and checkout dates, and count bookings for each month
      const monthlyBookings = {};
      roomData[0].forEach((room) => {
        if (room.selectedCheckInDate && room.selectedCheckoutDate) {
          const checkInDate = new Date(room.selectedCheckInDate);
          const checkoutDate = new Date(room.selectedCheckoutDate);
          console.log('Check-In Date:', room.selectedCheckInDate, 'Month:', checkInDate.getMonth());
          console.log('Check-Out Date:', room.selectedCheckoutDate, 'Month:', checkoutDate.getMonth());
          const checkInMonth = checkInDate.getMonth();
          const checkoutMonth = checkoutDate.getMonth();

          // Count bookings for each month
          for (let month = checkInMonth; month <= checkoutMonth; month++) {
            monthlyBookings[month] = (monthlyBookings[month] || 0) + 1;
          }
        }
      });

      // Find the month with the highest booking count
      let highestBookingMonth = -1;
      let highestBookingCount = 0;
      for (const month in monthlyBookings) {
        if (monthlyBookings[month] > highestBookingCount) {
          highestBookingMonth = month;
          highestBookingCount = monthlyBookings[month];
        }
      }

      // Create data for the pie charts
      const ageChartData = {
        labels: Object.keys(ageStats),
        datasets: [
          {
            data: Object.values(ageStats),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
          },
        ],
      };

      const occupationChartData = {
        labels: Object.keys(occupationStats),
        datasets: [
          {
            data: Object.values(occupationStats),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
          },
        ],
      };

      // Create data for the bar graph
      const bookingMonthsData = {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Monthly Bookings',
            data: Object.values(monthlyBookings),
            backgroundColor: 'rgba(75, 192, 192, 0.6',
          },
        ],
      };

      setChartData({
        age: ageChartData,
        occupation: occupationChartData,
        bookingMonths: bookingMonthsData,
        highestBookingMonth: highestBookingMonth,
      });
    }
  }, [roomData]);
  useEffect(() => {
    // Retrieve the adminKey from localStorage
    const storedAdminKey = localStorage.getItem('adminKey');
    console.log(storedAdminKey);
  
    // Set the retrieved adminKey to your component state if it's not empty
    if (storedAdminKey) {
      setAdminKeynew(storedAdminKey);
    }
  }, []);
  

  const handleSearch = async () => {
    try {
      // Send a request to the backend to fetch room details
      const response = await fetch(`/api/room-details/${roomID}/${adminKeynew}`);
      if (response.ok) {
        const data = await response.json();
        setRoomData(data);
      } else {
        setRoomData([]);
      }
    } catch (error) {
      console.error(error);
      setRoomData([]);
    }
  }
  const navigateToAddRoom = () => {
    navigate('/add-room');
  }

  return (
    <div>
      <h1>Room Booking Details</h1>
      {/* <p>Admin Key: {adminKeynew}</p> */}
      <div>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        {/* <input
          type="password"
          placeholder="Enter Admin Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
        /> */}
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
  <button
    onClick={navigateToAddRoom}
    style={{ padding: '10px 20px', marginTop: '10px' }} // Adjust the values as needed
  >
    Add Room
  </button>
</div>


      {roomData.length > 0 ? (
  <div>
    <p>Room Data:</p>
    <Carousel showArrows={true} showThumbs={false} dynamicHeight={true}>
      {roomData[0].map((room, index) => (
        <div key={index} className="carousel-card">
          <p>Room Name: {room.room}</p>
          {room.userDetails && (
            <div>
              <p>username: {room.userDetails.username}</p>
              <p>Age: {room.userDetails.age}</p>
              <p>Occupation: {room.userDetails.occupation}</p>
            </div>
          )}
          {room.selectedCheckInDate && room.selectedCheckoutDate && (
            <div>
              <p>Check-In Date: {room.selectedCheckInDate}</p>
              <p>Check-Out Date: {room.selectedCheckoutDate}</p>
            </div>
          )}
        </div>
      ))}
    </Carousel>
  </div>
) : (
  <p>No matching rooms found.</p>
)}


{chartData && (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, margin: '10px' }}>
              <h2>Age Distribution</h2>
              <Pie
                data={chartData.age}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                    },
                    title: {
                      display: true,
                      text: 'Age Distribution',
                      fontSize: 16,
                    },
                  },
                }}
              />
            </div>
            <div style={{ flex: 1, margin: '10px' }}>
              <h2>Occupation Distribution</h2>
              <Pie
                data={chartData.occupation}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                    },
                    title: {
                      display: true,
                      text: 'Occupation Distribution',
                      fontSize: 16,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div style={{ margin: '10px' }}>
            <h2>Monthly Booking Count</h2>
            <Bar
              data={chartData.bookingMonths}
              options={{
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Months',
                      font: {
                        size: 16,
                      },
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Booking Count',
                      font: {
                        size: 16,
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Monthly Booking Count',
                    fontSize: 16,
                  },
                },
              }}
            />
          </div>
          {/* <p>Highest Booking Month: {getMonthName(chartData.highestBookingMonth)}</p> */}
        </div>
      )}
    </div>
  );
}

// Helper function to get month name from the month index
function getMonthName(monthIndex) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
}

export default RoomDetailsnew;
