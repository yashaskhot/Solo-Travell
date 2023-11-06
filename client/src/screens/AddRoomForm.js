// import React, { useState } from "react";
// import axios from "axios";
// import "./form.css";
// import { useNavigate } from 'react-router-dom';

// function AddRoom() {
//   const [formData, setFormData] = useState({
//     name: "",
//     MaxCount: "",
//     Phonenumber: "",
//     Rentperday: "",
//     Type: "",
//     Description: "",
//     facilities: [],
//     imageurls: [],
//     Latitude: "",
//     Longitude: "",
//     adminKey:"",
//     Roomid:"",
//   });
  
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     if (name === "facilities") {
//       if (checked) {
//         setFormData({ ...formData, facilities: [...formData.facilities, value] });
//       } else {
//         setFormData({
//           ...formData,
//           facilities: formData.facilities.filter((facility) => facility !== value),
//         });
//       }
//     } else if (name === "imageurls") {
//       setFormData({ ...formData, imageurls: [...formData.imageurls, { url: value }] });
//     } else if (name === "Latitude" || name === "Longitude") {
//       setFormData({
//         ...formData,
//         [name]: newValue,
//       });
//     } else if (name === "name" || name === "Roomid") {
//       // Concatenate Roomid with name if name is being changed
//       const roomName = name === "name" ? newValue : formData.name;
//       const roomId = name === "Roomid" ? newValue : formData.Roomid;
//       setFormData({
//         ...formData,
//         name: roomName,
//         Roomid: roomId, // Keep the Roomid as is
//       });
//     } else {
//       setFormData({ ...formData, [name]: newValue });
//     }
//   };

//   const handleRoomTypeChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const form = new FormData();
//       const roomName = `${formData.name} - ${formData.Roomid}`; // Concatenate name and Roomid
//       console.log(roomName)
//       form.append("name", formData.name); // Save the concatenated name
//       form.append("MaxCount", formData.MaxCount);
//       form.append("Phonenumber", formData.Phonenumber);
//       form.append("Rentperday", formData.Rentperday);
//       form.append("Type", formData.Type);
//       form.append("Description", formData.Description);
//       form.append("facilities", formData.facilities.join(","));
  
//       formData.imageurls.forEach((urlObject) => {
//         form.append("imageurls", urlObject.url);
//       });
  
//       form.append("Latitude", formData.Latitude);
//       form.append("Longitude", formData.Longitude);
//       form.append("adminKey", formData.adminKey);
//       form.append("Roomid", roomName); // Save the concatenated Roomid
  
//       const response = await axios.post("/api/addrooms/create", form);
  
//       console.log("Room created successfully:", response.data);
//       navigate('/home');
//     } catch (error) {
//       console.error("Error creating room:", error);
//     }
//   };
  
//   return (
//     <div className="wallpaper">
//       <div className="background">
//         <h2>Register with us</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="MaxCount"
//                 value={formData.MaxCount}
//                 onChange={handleChange}
//                 placeholder="Max Count"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="Phonenumber"
//                 value={formData.Phonenumber}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="Roomid"
//                 value={formData.Roomid}
//                 onChange={handleChange}
//                 placeholder="Room id"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="Rentperday"
//                 value={formData.Rentperday}
//                 onChange={handleChange}
//                 placeholder="Rent per Day"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <select
//                 className="select-field"
//                 name="Type"
//                 value={formData.Type}
//                 onChange={handleRoomTypeChange}
//                 required
//               >
//                 <option value="">Select a Room Type</option>
//                 <option value="hostelroom">Hostel Room</option>
//                 <option value="penthouse">Penthouse</option>
//                 <option value="duelex">Duelex</option>
//                 <option value="beachhouse">Beach House</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <textarea
//                 className="input-field"
//                 name="Description"
//                 value={formData.Description}
//                 onChange={handleChange}
//                 placeholder="Description"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="checkbox-container">
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="facilities"
//                   value="WiFi"
//                   checked={formData.facilities.includes("WiFi")}
//                   onChange={handleChange}
//                   style={{ borderRadius: "50%" }}
//                 />
//                 WiFi
//               </label>
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="facilities"
//                   value="Pool"
//                   checked={formData.facilities.includes("Pool")}
//                   onChange={handleChange}
//                   style={{ borderRadius: "50%" }}
//                 />
//                 Pool
//               </label>
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="facilities"
//                   value="Clubhouse"
//                   checked={formData.facilities.includes("Clubhouse")}
//                   onChange={handleChange}
//                   style={{ borderRadius: "50%" }}
//                 />
//                 Clubhouse
//               </label>
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="Latitude"
//                 value={formData.Latitude}
//                 onChange={handleChange}
//                 placeholder="Latitude"
//                 required
//               />
//             </div>
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="Longitude"
//                 value={formData.Longitude}
//                 onChange={handleChange}
//                 placeholder="Longitude"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="imageurls"
//                 value={formData.imageurls.map((urlObject) => urlObject.url).join(",")}
//                 onChange={handleChange}
//                 placeholder="Image URLs"
//               />
//             </div>
//           </div>
//           <div className="form-row">
//             <div>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="adminKey"
//                 value={formData.adminKey}
//                 onChange={handleChange}
//                 placeholder="Admin Key"
//                 required
//               />
//             </div>
//             </div>
//           <button className="button" type="submit">
//             Add Room
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddRoom;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form.css";
import { useNavigate } from 'react-router-dom';

function AddRoom() {
  const [formData, setFormData] = useState({
    name: "",
    MaxCount: "",
    Phonenumber: "",
    Rentperday: "",
    Type: "",
    Description: "",
    facilities: [],
    imageurls: [],
    Latitude: "",
    Longitude: "",
    Roomid: "",
  });

  const [defaultAdminKey, setDefaultAdminKey] = useState(''); // Change 'yourDefaultAdminKey' to your actual default admin key
  const navigate = useNavigate();

  useEffect(() => {
    // Extract admin key from local storage (change 'adminKey' to your key's actual name)
    const storedAdminKey = localStorage.getItem("adminKey");
    if (storedAdminKey) {
      setDefaultAdminKey(storedAdminKey);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "facilities") {
      if (checked) {
        setFormData({ ...formData, facilities: [...formData.facilities, value] });
      } else {
        setFormData({
          ...formData,
          facilities: formData.facilities.filter((facility) => facility !== value),
        });
      }
    } else if (name === "imageurls") {
      setFormData({ ...formData, imageurls: [...formData.imageurls, { url: value }] });
    } else if (name === "Latitude" || name === "Longitude") {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    } else if (name === "name" || name === "Roomid") {
      const roomName = name === "name" ? newValue : formData.name;
      const roomId = name === "Roomid" ? newValue : formData.Roomid;
      setFormData({
        ...formData,
        name: roomName,
        Roomid: roomId,
      });
    } else {
      setFormData({ ...formData, [name]: newValue });
    }
  };

  const handleRoomTypeChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      const roomName = `${formData.name} - ${formData.Roomid}`;
      form.append("name", formData.name);
      form.append("MaxCount", formData.MaxCount);
      form.append("Phonenumber", formData.Phonenumber);
      form.append("Rentperday", formData.Rentperday);
      form.append("Type", formData.Type);
      form.append("Description", formData.Description);
      form.append("facilities", formData.facilities.join(","));

      formData.imageurls.forEach((urlObject) => {
        form.append("imageurls", urlObject.url);
      });

      form.append("Latitude", formData.Latitude);
      form.append("Longitude", formData.Longitude);
      form.append("adminKey", defaultAdminKey);
      form.append("Roomid", roomName);

      const response = await axios.post("/api/addrooms/create", form);

      console.log("Room created successfully:", response.data);
      navigate('/home/:username');
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="wallpaper">
      <div className="background">
        <h2>Register with us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <input
                className="input-field"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <input
                className="input-field"
                type="text"
                name="MaxCount"
                value={formData.MaxCount}
                onChange={handleChange}
                placeholder="Max Count"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <input
                className="input-field"
                type="text"
                name="Phonenumber"
                value={formData.Phonenumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <input
                className="input-field"
                type="text"
                name="Roomid"
                value={formData.Roomid}
                onChange={handleChange}
                placeholder="Room id"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <input
                className="input-field"
                type="text"
                name="Rentperday"
                value={formData.Rentperday}
                onChange={handleChange}
                placeholder="Rent per Day"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <select
                className="select-field"
                name="Type"
                value={formData.Type}
                onChange={handleRoomTypeChange}
                required
              >
                <option value="">Select a Room Type</option>
                <option value="hostelroom">Hostel Room</option>
                <option value="penthouse">Penthouse</option>
                <option value="duelex">Duelex</option>
                <option value="beachhouse">Beach House</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div>
              <textarea
                className="input-field"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="facilities"
                  value="WiFi"
                  checked={formData.facilities.includes("WiFi")}
                  onChange={handleChange}
                  style={{ borderRadius: "50%" }}
                />
                WiFi
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="facilities"
                  value="Pool"
                  checked={formData.facilities.includes("Pool")}
                  onChange={handleChange}
                  style={{ borderRadius: "50%" }}
                />
                Pool
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="facilities"
                  value="Clubhouse"
                  checked={formData.facilities.includes("Clubhouse")}
                  onChange={handleChange}
                  style={{ borderRadius: "50%" }}
                />
                Clubhouse
              </label>
            </div>
          </div>
          <div className="form-row">
            <div>
              <input
                className="input-field"
                type="text"
                name="Latitude"
                value={formData.Latitude}
                onChange={handleChange}
                placeholder="Latitude"
                required
              />
            </div>
            <div>
              <input
                className="input-field"
                type="text"
                name="Longitude"
                value={formData.Longitude}
                onChange={handleChange}
                placeholder="Longitude"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <input
                className="input-field"
                type="text"
                name="imageurls"
                value={formData.imageurls.map((urlObject) => urlObject.url).join(",")}
                onChange={handleChange}
                placeholder="Image URLs"
              />
            </div>
          </div>
          <div className="form-row">
  <div>
    <input
      className="input-field"
      type="text"
      name="adminKey"
      value={defaultAdminKey}
      readOnly
      placeholder="Admin Key"
      required
    />
  </div>
</div>

          <button className="button" type="submit">
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
