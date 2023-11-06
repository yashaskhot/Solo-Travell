import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#0bb3f0");

  // CSS for centering the loader
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Adjust this value based on your layout needs
  };

  return (

      <HashLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
}

export default Loader;
