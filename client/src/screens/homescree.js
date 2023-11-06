// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';
// // import Room from "../components/Rooms";
// // import HashLoader from "../components/Loader";
// // import 'antd/lib/app/style/index';
// // import moment from 'moment';
// // import Errornew from "../components/Error";
// // import { isEqual } from 'lodash';
// // import { DatePicker, Space, Input, Select } from 'antd';
// // const { RangePicker } = DatePicker;
// // const { Search } = Input;
// // const { Option } = Select; // Import Select component

// // function Homescree() {
// //   const [rooms, setRooms] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState();
// //   const [selectedDates, setSelectedDates] = useState(); // Initialize without a default value
// //   const [initialLoad, setInitialLoad] = useState(true); // Track if the initial load has happened
// //   const [fromdate , setFromDate]=useState();
// //   const [ToDate , setToDate]=useState();
// //   const [searchQuery, setSearchQuery] = useState(""); // State for search query
// //   const [selectedRoomType, setSelectedRoomType] = useState("all"); // State for selected room type

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axios.get('/api/rooms/getallroom');
// //         console.log('API Response:', response.data);
// //         setRooms(response.data);

// //         // Set the default date range once data is fetched, only if it's the initial load
// //         if (initialLoad) {
// //           setSelectedDates([moment(), moment()]);
// //           setInitialLoad(false);
// //         }

// //         setLoading(false);
// //       } catch (error) {
// //         setError(true);
// //         console.log('API Error:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [initialLoad]); // Only fetch data on initial load

// //   const filteredRooms = rooms.filter(room => {
// //     // Filter rooms based on the search query
// //     return room.name.toLowerCase().includes(searchQuery.toLowerCase());
// //   });
// //   const loggedInUsername = localStorage.getItem('loggedInUsername');
// //   // Filter rooms based on the selected room type
// //   const roomsByType = selectedRoomType === "all" ? filteredRooms : filteredRooms.filter(room => room.Type === selectedRoomType);

// //   const handleRoomTypeChange = (value) => {
// //     setSelectedRoomType(value);
// //   };

// //   return (
// //     <div className="container">
// //       <div className="row">
// //         <div className="col-md-3">
// //           {/* Pass the selectedDates state as the value for RangePicker */}
// //           {/* <RangePicker
// //             format='DD-MM-YYYY'
// //             value={selectedDates}
// //             onChange={handleDateChange}
// //           /> */}
// //         </div>
// //         <div className="col-md-12">
// //           <h3>Welcome, {loggedInUsername}</h3>
// //         </div>
// //         <div className="col-md-6">
// //           <Search
// //             placeholder="Search hotels by name"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             style={{ marginBottom: "10px" }}
// //           />
// //         </div>
// //         <div className="col-md-3">
// //         <Select
// //   defaultValue="all"
// //   style={{ width: 120 }}
// //   onChange={handleRoomTypeChange}
// // >
// //   <Option value="all">All Types</Option>
// //   <Option value="hostelroom">Hostel Room</Option>
// //   <Option value="duelex">Deluxe</Option>
// //   <Option value="penthouse">Penthouse</Option>
// //   <Option value="beachhouse">Beach House</Option>
// //   {/* Add more room types as needed */}
// // </Select>

// //         </div>
// //       </div>
// //       <div className="row justify-content-center mt-5">
// //         <div>
// //           {loading ? (<HashLoader></HashLoader>) : (
// //             <ul>
// //               {roomsByType.map(room => (
// //                 <div key={room._id} className="col-md-9 mt-2">
// //                   <Room room={room} fromdate={fromdate} ToDate={ToDate} />
// //                 </div>
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Homescree;
// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import Room from "../components/Rooms";
// import HashLoader from "../components/Loader";
// import 'antd/lib/app/style/index';
// import moment from 'moment';
// import Errornew from "../components/Error";
// import { isEqual } from 'lodash';
// import { Link, useNavigate } from "react-router-dom";
// import { DatePicker, Space, Input, Select, Slider } from 'antd';
// const { RangePicker } = DatePicker;
// const { Search } = Input;
// const { Option } = Select;
// function Homescree() {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();
//   const [selectedDates, setSelectedDates] = useState();
//   const [initialLoad, setInitialLoad] = useState(true);
//   const [fromdate, setFromDate] = useState();
//   const [ToDate, setToDate] = useState();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRoomType, setSelectedRoomType] = useState("all");
//   const [budgetRange, setBudgetRange] = useState([0, 1000]); // Initialize with a default budget range
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/api/rooms/getallroom');
//         console.log('API Response:', response.data);
//         setRooms(response.data);

//         if (initialLoad) {
//           setSelectedDates([moment(), moment()]);
//           setInitialLoad(false);
//         }

//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         console.log('API Error:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [initialLoad]);
//   useEffect(() => {
//     // Display "from date" and "to date" for all rooms and their current bookings in the console
//     rooms.forEach((room, roomIndex) => {
//       console.log(`Room ${roomIndex + 1}: ${room.name}`);
//       room.currentbookings.forEach((booking, bookingIndex) => {
//         console.log(`  Booking ${bookingIndex + 1}: From Date - ${booking.fromdate}, To Date - ${booking.todate}`);
//       });
//     });
//   }, [rooms]);

//   const filteredRooms = rooms.filter(room => {
//     return room.name.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   const loggedInUsername = localStorage.getItem('loggedInUsername');

//   const roomsByType = selectedRoomType === "all" ? filteredRooms : filteredRooms.filter(room => room.Type === selectedRoomType);

//   const handleRoomTypeChange = (value) => {
//     setSelectedRoomType(value);
//   };
//   // Filter rooms based on budget range
//   const roomsByBudget = roomsByType.filter(room => room.Rentperday >= budgetRange[0] && room.Rentperday <= budgetRange[1]);

//   const handleBudgetChange = (value) => {
//     setBudgetRange(value);
//   };
//   const marks = {
//     0: '0',
//     1000: '1000',
//     2000: '2000',
//     3000: '3000',
//     4000: '4000',
//     5000: '5000',
//     6000: '6000',
//     7000: '7000',
//     8000: '8000',
//     9000: '9000',
//     10000: '10000',
//   };
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-3">
//           {/* Your date picker code */}
//         </div>
//         <div className="col-md-12">
//           <h3>Welcome, {loggedInUsername}</h3>
//         </div>
//         <div className="col-md-6">
//           <Search
//             placeholder="Search hotels by name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{ marginBottom: "10px" }}
//           />
//         </div>
//         <div className="col-md-3">
//           <Select
//             defaultValue="all"
//             style={{ width: 120 }}
//             onChange={handleRoomTypeChange}
//           >
//              <Option value="all">All Types</Option>
//    <Option value="hostelroom">Hostel Room</Option>
//    <Option value="duelex">Deluxe</Option>
//    <Option value="penthouse">Penthouse</Option>
//    <Option value="beachhouse">Beach House</Option>
//    {/* Add more room types as needed */}
//           </Select>
//         </div>
//         <div className="col-md-12">
//           <div style={{ marginBottom: "20px" }}>
//             <span style={{ marginRight: "20px" }}>Budget Range: ${budgetRange[0]} - ${budgetRange[1]}</span>
//             <Slider
//               range
//               min={0}
//               max={10000}
//               marks={marks}
//               step={10}
//               value={budgetRange}
//               onChange={handleBudgetChange}
//             />
//           </div>
//         </div>
//         <div className="row justify-content-center mt-5">
//         {/* Add buttons for car rentals and booking details */}
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate("/home/:username/carrentals")}
//         >
//           Car Rentals
//         </button>
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate("/bookings")}
//         >
//           Booking Details
//         </button>
//       </div>
//       </div>
//       <div className="row justify-content-center mt-5">
//         <div>
//           {loading ? (<HashLoader />) : (
//             <ul>
//               {roomsByBudget.map(room => (
//                 <div key={room._id} className="col-md-9 mt-2">
//                   <Room room={room} fromdate={fromdate} ToDate={ToDate} />
//                 </div>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homescree;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Room from "../components/Rooms";
import HashLoader from "../components/Loader";
import 'antd/lib/app/style/index';
import moment from 'moment';
import Errornew from "../components/Error";
import { isEqual } from 'lodash';
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, Space, Input, Select, Slider } from 'antd';
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

function Homescree() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedDates, setSelectedDates] = useState();
  const [initialLoad, setInitialLoad] = useState(true);
  const [fromdate, setFromDate] = useState();
  const [ToDate, setToDate] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("all");
  const [budgetRange, setBudgetRange] = useState([0, 1000]); // Initialize with a default budget range
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/rooms/getallroom');
        console.log('API Response:', response.data);
        setRooms(response.data);

        if (initialLoad) {
          setSelectedDates([moment(), moment()]);
          setInitialLoad(false);
        }

        setLoading(false);
      } catch (error) {
        setError(true);
        console.log('API Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [initialLoad]);
  useEffect(() => {
    // Display "from date" and "to date" for all rooms and their current bookings in the console
    rooms.forEach((room, roomIndex) => {
      console.log(`Room ${roomIndex + 1}: ${room.name}`);
      room.currentbookings.forEach((booking, bookingIndex) => {
        console.log(`  Booking ${bookingIndex + 1}: From Date - ${booking.fromdate}, To Date - ${booking.todate}`);
      });
    });
  }, [rooms]);

  const filteredRooms = rooms.filter(room => {
    return room.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const loggedInUsername = localStorage.getItem('loggedInUsername');

  const roomsByType = selectedRoomType === "all" ? filteredRooms : filteredRooms.filter(room => room.Type === selectedRoomType);

  const handleRoomTypeChange = (value) => {
    setSelectedRoomType(value);
  };
  // Filter rooms based on budget range
  const roomsByBudget = roomsByType.filter(room => room.Rentperday >= budgetRange[0] && room.Rentperday <= budgetRange[1]);

  const handleBudgetChange = (value) => {
    setBudgetRange(value);
  };
  const marks = {
    0: '0',
    1000: '1000',
    2000: '2000',
    3000: '3000',
    4000: '4000',
    5000: '5000',
    6000: '6000',
    7000: '7000',
    8000: '8000',
    9000: '9000',
    10000: '10000',
  };

  // Define a CSS class for the button container
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          {/* Your date picker code */}
        </div>
        <div className="col-md-12">
          <h3>Welcome, {loggedInUsername}</h3>
        </div>
        <div className="col-md-6">
          <Search
            placeholder="Search hotels by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <div className="col-md-3">
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={handleRoomTypeChange}
          >
            <Option value="all">All Types</Option>
            <Option value="hostelroom">Hostel Room</Option>
            <Option value="duelex">Deluxe</Option>
            <Option value="penthouse">Penthouse</Option>
            <Option value="beachhouse">Beach House</Option>
          </Select>
        </div>
        <div className="col-md-12">
          <div style={{ marginBottom: "20px" }}>
            <span style={{ marginRight: "20px" }}>Budget Range: ${budgetRange[0]} - ${budgetRange[1]}</span>
            <Slider
              range
              min={0}
              max={10000}
              marks={marks}
              step={10}
              value={budgetRange}
              onChange={handleBudgetChange}
            />
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          {/* Add buttons for car rentals and booking details within the button container */}
          <div style={buttonContainerStyle}>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/home/:username/carrentals")}
            >
              Car Rentals
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/bookings")}
            >
              Booking Details
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/Mainpage")}
            >
              Home
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div>
          {loading ? (<HashLoader />) : (
            <ul>
              {roomsByBudget.map(room => (
                <div key={room._id} className="col-md-9 mt-2">
                  <Room room={room} fromdate={fromdate} ToDate={ToDate} />
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homescree;
