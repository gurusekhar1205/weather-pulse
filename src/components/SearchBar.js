import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function SearchBar({ fetchWeather }) {

  const [city, setCity] = useState("");

  const handleSearch = () => {

    if (city.trim() !== "") {
      fetchWeather(city);
    }

  };

  return (

    <div style={{ marginTop: "20px" }}>

      <TextField
        label="Enter City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchWeather(city);
          }
        }}
      />

      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "10px", height: "55px" }}
        onClick={handleSearch}
      >
        Search
      </Button>

    </div>

  );
}

export default SearchBar;