import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function Forecast({ data }) {

  if (!data) return null;

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "30px",
      flexWrap: "wrap"
    }}>

      {data.map((day, index) => {

        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        const icon = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        return (

          <Card key={index} style={{ width: "120px", textAlign: "center" }}>

            <CardContent>

              <Typography variant="h6">
                {dayName}
              </Typography>

              <img src={iconUrl} alt="forecast icon" />

              <Typography>
                {Math.round(day.main.temp)} °C
              </Typography>

              <Typography>
                {day.weather[0].main}
              </Typography>

            </CardContent>

          </Card>

        );

      })}

    </div>

  );

}

export default Forecast;