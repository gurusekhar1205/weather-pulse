import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function WeatherCard({ data }) {

  if (!data || !data.main || !data.weather || !data.sys) {
    return null;
  }

  const iconCode = data.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (

    <Card style={{ marginTop: "30px", width: "320px", marginLeft: "auto", marginRight: "auto" }}>

      <CardContent>

        <Typography variant="h5">
          {data.name}, {data.sys.country}
        </Typography>

        <img src={iconUrl} alt="weather icon" />

        <Typography variant="h4">
          {Math.round(data.main.temp)} °C
        </Typography>

        <Typography>
          Weather: {data.weather[0].description}
        </Typography>

        <Typography>
          Humidity: {data.main.humidity} %
        </Typography>

        <Typography>
          Wind Speed: {data.wind.speed} m/s
        </Typography>

      </CardContent>

    </Card>

  );
}

export default WeatherCard;