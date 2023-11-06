// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import HashLoader from "../components/Loader";
// // import Errornew from "../components/Error";
// // import { DatePicker } from "antd";
// // import "antd/lib/app/style/index";

// // function Bookingscreen() {
// //   const [room, setRoom] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(false);
// //   const [selectedCheckInDate, setSelectedCheckInDate] = useState(null); // Store the selected check-in date
// //   const [selectedDates, setSelectedDates] = useState(null);
// //   const { name } = useParams();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const response = (await axios.post("/api/rooms/getallroombyid", { name: name }))
// //           .data;
// //         console.log("API Response:", response);
// //         setRoom(response);
// //         setLoading(false);
// //       } catch (error) {
// //         setError(true);
// //         console.log("API Error:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [name]);

// //   const handleDateChange = (dates) => {
// //     setSelectedDates(dates);
// //     if (dates && dates.length >= 1) {
// //       setSelectedCheckInDate(dates[0].format("DD-MM-YYYY")); // Store the selected check-in date
// //     }
// //   };

// //   const handleBookNow = () => {
// //     if (selectedDates && selectedDates.length >= 2) {
// //       const checkInDate = selectedDates[0].format("DD-MM-YYYY");
// //       const checkOutDate = selectedDates[1].format("DD-MM-YYYY");
// //       // Construct your URL with selected dates and navigate
// //       const url = `/book/${encodeURIComponent(room.name)}?checkIn=${checkInDate}&checkOut=${checkOutDate}`;
// //       window.location.href = url;
// //     }
// //   };

// //   if (loading) {
// //     return <HashLoader />;
// //   }

// //   if (error) {
// //     return <Errornew />;
// //   }

// //   if (!room) {
// //     return <h1>Room not found</h1>;
// //   }
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import HashLoader from "../components/Loader";
// import Errornew from "../components/Error";
// import { DatePicker } from "antd";
// import "antd/lib/app/style/index";

// function Bookingscreen() {
//   const [room, setRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
//   const [selectedCheckoutDate, setSelectedCheckoutDate] = useState(null);
//   const [selectedDates, setSelectedDates] = useState(null);
//   const { name } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = (await axios.post("/api/rooms/getallroombyid", { name: name }))
//           .data;
//         console.log("API Response:", response);
//         setRoom(response);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         console.log("API Error:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [name]);

//   const handleDateChange = (dates) => {
//     setSelectedDates(dates);
//     if (dates && dates.length >= 1) {
//       setSelectedCheckInDate(dates[0].format("DD-MM-YYYY"));
//       setSelectedCheckoutDate(dates[1].format("DD-MM-YYYY"));
//     }
//   };


//   if (loading) {
//     return <HashLoader />;
//   }

//   if (error) {
//     return <Errornew />;
//   }

//   if (!room) {
//     return <h1>Room not found</h1>;
//   }

//   const toDateString = selectedDates && selectedDates.length >= 2 ? selectedDates[1].format("DD-MM-YYYY") : '';

//   const numberOfDays = selectedDates && selectedDates.length >= 2 ? selectedDates[1].diff(selectedDates[0], 'days') : 0;
//   const rentPerDay = parseFloat(room.Rentperday.replace('$', '')); // Remove the dollar sign

//   console.log("selectedDates:", selectedDates);
// console.log("numberOfDays:", numberOfDays);

// async function bookroom(){
//   const bookingdetails ={
//     room,
//     selectedCheckInDate,
//     selectedCheckoutDate,
//     rentPerDay,
//     totalamount,
//     totaldays


//   }
//   try {
//     setLoading(true);
//     const response = (await axios.post("/api/bookings", { name: name }))
//       .data;
//     console.log("API Response:", response);
//     setRoom(response);
//     setLoading(false);
//   } catch (error) {
//     setError(true);
//     console.log("API Error:", error);
//     setLoading(false);
//   }
// };
//  }



//   return (
//     <div className="container">
//       <div className="row">
//         <div className="Booking" style={{ textAlign: "right" }}>
//           <div className="row mt-5 containernew">
//             <div className="col">
//               <img
//                 src={room.imageurls[0]}
//                 alt={`Image`}
//                 className="room-image"
//               />
//             </div>
//             <div className="col">
//               <h1>Booking Details</h1>
//               <hr />
//               <div className="right-details">
//                 <h1>{room.name}</h1>
//                 <p>Description: {room.Description}</p>
//                 <p>Max Count: {room.MaxCount}</p>
//                 <p>Phone Number: {room.Phonenumber}</p>
//                 {selectedCheckInDate && (
//                   <p>Selected Check-in Date: {selectedCheckInDate}</p>
//                 )}
//                  <p>Selected Check-out Date: {toDateString}</p>

//                 <p>Type: {room.Type}</p>
//               </div>
//               <div className="AmountDetails" style={{ textAlign: "right" }}>
//                 <h1>Amount Details</h1>
//                 <hr />
//                 <p>Number of Days: {numberOfDays}</p>
//                 <p>Rent per day: {room.Rentperday}</p>
//                 <p>Total Rent: {rentPerDay* numberOfDays}</p>
//                 <DatePicker.RangePicker
//                   format="DD-MM-YYYY"
//                   value={selectedDates}
//                   onChange={handleDateChange}
//                 />
//                 <button className="btn btn-primary m-2" onClick={bookroom}>
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );


// export default Bookingscreen;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HashLoader from "../components/Loader";
import Errornew from "../components/Error";
import { DatePicker } from "antd";
import "antd/lib/app/style/index";
import StripeCheckout from 'react-stripe-checkout';
import LocationMap from "../components/LocationMap";
import "./BookingScreen.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faSwimmingPool, faChessBoard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



function Bookingscreen() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
  const [selectedCheckoutDate, setSelectedCheckoutDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);
  const [temproom, setTemproom] = useState(null);
  const { name } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {

    const username = localStorage.getItem('loggedInUsername');

    // Fetch user details based on the username
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${username}`);
        const user = userResponse.data;
        setUserDetails(user);
        console.log("User Details:", user); // Log user details here
      } catch (userError) {
        console.error('Error fetching user details:', userError);
      }
    };
    
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getallroombyid", { name: name });
        console.log("API Response:", response);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log("API Error:", error);
        setLoading(false);
      }
    };

    Promise.all([fetchUserDetails(), fetchRoomDetails()]);
  }, [name]);

  console.log("User Details:", userDetails);
  console.log("Room Details:", room);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    if (dates && dates.length >= 1) {
      setSelectedCheckInDate(dates[0].format("DD-MM-YYYY"));
      setSelectedCheckoutDate(dates[1].format("DD-MM-YYYY"));
    }
  };

  const checkDateOverlap = (checkInDate, checkoutDate) => {
    if (!Array.isArray(room.currentBookings)) {
      console.error("room.currentBookings is not an array:", room.currentBookings);
      return false; // If currentBookings is not an array, return false
    }

    for (const booking of room.currentBookings) {
      const bookingFromDate = booking.fromdate;
      const bookingToDate = booking.todate;

      const checkInDateTime = new Date(checkInDate).getTime();
      const checkoutDateTime = new Date(checkoutDate).getTime();
      const bookingFromDateTime = new Date(bookingFromDate).getTime();
      const bookingToDateTime = new Date(bookingToDate).getTime();

      if (
        (checkInDateTime >= bookingFromDateTime && checkInDateTime <= bookingToDateTime) ||
        (checkoutDateTime >= bookingFromDateTime && checkoutDateTime <= bookingToDateTime) ||
        (checkInDateTime <= bookingFromDateTime && checkoutDateTime >= bookingToDateTime)
      ) {
        return true; // Selected dates overlap with a current booking
      }
    }
    return false; // Selected dates do not overlap with any current booking
  };


  const toDateString = selectedDates && selectedDates.length >= 2 ? selectedDates[1].format("DD-MM-YYYY") : '';

  const numberOfDays = selectedDates && selectedDates.length >= 2 ? selectedDates[1].diff(selectedDates[0], 'days') : 0;
  const rentPerDay = room?.Rentperday ? parseFloat(room.Rentperday.replace('$', '')) : 0;

  const onToken = async (token) => {
    const checkInDate = selectedCheckInDate;
    const checkoutDate = selectedCheckoutDate;
    const username = localStorage.getItem('loggedInUsername');

    
    // Remove the comments around this block if you want to check for date overlap
    /*
    if (checkDateOverlap(checkInDate, checkoutDate)) {
      // Handle overlapping dates
      setError(true); // Set error state to true
      return; // Exit the function
    }
    */
  
    const bookingdetails = {
      room,
      selectedCheckInDate,
      selectedCheckoutDate,
      rentPerDay,
      totalamount: rentPerDay * numberOfDays,
      totaldays: numberOfDays,
      token: token, // Include the token in the request body
      userDetails
    };
  
    try {
      setLoading(true);
      const response = (await axios.post("/api/bookings/createbooking", bookingdetails)).data;
      console.log("API Response:", response);
      
      // Check the response for success or error here
      if (response.success) {
        // Handle successful booking
        // You can redirect or display a success message to the user
        navigate(`/home/${username}`);
      } else {
        // Handle booking error
        setError(true);
        navigate(`/home/${username}`);
        // You can set an error message here based on the response
      }
      
      setLoading(false);
    } catch (error) {
      setError(true);
      navigate(`/home/${username}`);
      console.log("API Error:", error);
      setLoading(false);
    }
  };
  
  // const bookroom = async () => {
  //   const checkInDate = selectedCheckInDate;
  //   const checkoutDate = selectedCheckoutDate;
    // if (checkDateOverlap(checkInDate, checkoutDate)) {
    //   // Handle overlapping dates
    //   setError(true); // Set error state to true
    //   return; // Exit the function
    // }

  //   const bookingdetails = {
  //     room,
  //     selectedCheckInDate,
  //     selectedCheckoutDate,
  //     rentPerDay,
  //     totalamount: rentPerDay * numberOfDays,
  //     totaldays: numberOfDays
  //   };

  //   try {
  //     setLoading(true);
  //     const response = (await axios.post("/api/bookings/createbooking", bookingdetails)).data;
  //     console.log("API Response:", response);
  //     // setRoom(response);
  //     // setLoading(false);
  //   } catch (error) {
  //     // setError(true);
  //     console.log("API Error:", error);
  //     // setLoading(false);
  //   }
  // };

  if (loading) {
    return <HashLoader />;
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error: Selected dates overlap with existing bookings.</h1>
        {/* You can also include a button or link to go back to the booking form */}
      </div>
    );
  }

  if (!room) {
    return <h1>Room not found</h1>;
  }

  return (
    <div className="container text-center" style={{ backgroundImage: `url(${room.imageurls[0]})`, backgroundSize: 'cover', minHeight: '100vh', width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "white" }}>
      <div className="row"
        style={{
          background: 'rgba(0, 0, 0, 0.7)', // Adjust the RGBA values as needed
          borderRadius: '10px', // You can adjust the border radius for round edges
          padding: '15px', // Add some padding for spacing
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' // Add a box shadow for the 3D effect
        }}>
        {/* Booking Details */}
        <div className="col-md-6 mx-auto">
          <div className="Booking">
            <h1>Booking Details</h1>
            <hr />
            <div className="right-details">
              <h1>{room.name}</h1>
              <p>Description: {room.Description}</p>
              <p>Max Count: {room.MaxCount}</p>
              <p>Phone Number: {room.Phonenumber}</p>
              {selectedCheckInDate && (
                <p>Selected Check-in Date: {selectedCheckInDate}</p>
              )}
              {selectedCheckoutDate && (
                <p>Selected Check-Out Date: {selectedCheckoutDate}</p>
              )}
              <p>Type: {room.Type}</p>

              <div>
                <div>

                {room && room.facilities && room.facilities.length > 0 && (
  <div className="facility-icons">
    <div className="facility-title">Facilities:</div>
    {room.facilities[0].split(',').map((facility, index) => (
      <div key={index} className="facility-icon-container">
        {facility.trim() === "WiFi" && (
          <FontAwesomeIcon icon={faWifi} className="facility-icon" />
        )}
        {facility.trim() === "Clubhouse" && (
          <FontAwesomeIcon icon={faChessBoard} className="facility-icon" />
        )}
        {facility.trim() === "Pool" && (
          <FontAwesomeIcon icon={faSwimmingPool} className="facility-icon" />
        )}
      </div>
    ))}
  </div>
)}

                  


                </div>




              </div>


            </div>
          </div>
        </div>
      </div>

      <div className="row"
        style={{
          background: 'rgba(0, 0, 0, 0.7)', // Adjust the RGBA values as needed
          borderRadius: '10px', // You can adjust the border radius for round edges
          padding: '15px', // Add some padding for spacing
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' // Add a box shadow for the 3D effect
        }}>
        {/* Amount Details */}
        <div className="col-md-6 mx-auto">
          <div className="AmountDetails">
            <h1>Amount Details</h1>
            <hr />
            <p>Number of Days: {numberOfDays}</p>
            <p>Rent per day: {room.Rentperday}</p>
            <p>Total Rent: {rentPerDay * numberOfDays}</p>
            <DatePicker.RangePicker
              format="DD-MM-YYYY"
              value={selectedDates}
              onChange={handleDateChange}
            />
            <StripeCheckout
              amount={rentPerDay * numberOfDays * 100}
              token={onToken} // Use the onToken function as a callback
              stripeKey="pk_test_51NjEVWSIqBmCrKtA6zesmwty7bBDpDstYzzlvzxK5Zr7kAJbdAzSOgmWGxusOluevOKitzIwITo0rZ7rH7WWcwKZ00yodLtKVN"
            >
              <button className="btn btn-primary m-2">Pay Now</button>
            </StripeCheckout>
          </div>
        </div>
      </div>

      <div className="row" style={{
        background: 'rgba(0, 0, 0, 0.7)', // Adjust the RGBA values as needed
        borderRadius: '10px', // You can adjust the border radius for round edges
        padding: '15px', // Add some padding for spacing
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' // Add a box shadow for the 3D effect
      }}>
        {/* Location Map */}
        <div className="col-md-12 mx-auto">
          <LocationMap
            latitude={room.Latitude}
            longitude={room.Longitude}
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      </div>
    </div>




  );
}

export default Bookingscreen;

