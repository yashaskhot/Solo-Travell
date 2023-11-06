import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homescree from "./screens/homescree";
import Bookingscreen from "./screens/Bookingscreen";
import Login from './screens/Login';
import Signup from './screens/Signup';
import AddRoomForm from "./screens/AddRoomForm";
import RoomDetail from './screens/BookingDetails';
import HomePageComponent from './components/Homepage';
import AdminLoginPage from './screens/Adminlogin';
import RoomDetailsnew from './screens/AdminScreens';
import Errornew from './components/Error';
import LocationResults from './screens/LocationResults';
import ApiScreen from './screens/Restaurants';
import Mainpage from './screens/Mainpage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Redirect any other routes to the login page */}
          <Route path="/*" element={<Navigate to="/homepage" />} />
          <Route path="/home/:username" element={<Homescree />} />
          <Route path="/homepage" element={<HomePageComponent />} />
          <Route path="/book/:username/:name/" element={<Bookingscreen />} />
          <Route path="/bookings" element={<RoomDetail />} />
          <Route path="/admin" element={<RoomDetailsnew />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          {/* Add a route for adding a room */}
          <Route path="/add-room" element={<AddRoomForm />} />
          <Route path="/error" element={<Errornew />} />
          {/* Add a new route */}
          <Route path="/home/:username/carrentals" element={ <LocationResults />} />
          <Route path="/home/Restaurants" element={ <ApiScreen />} />
          <Route path="/Mainpage" element={ <Mainpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
