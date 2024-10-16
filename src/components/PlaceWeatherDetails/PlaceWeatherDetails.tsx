import React from 'react'
import { Weather } from '../../hooks/useWeather'

type Props = {
    weather: Weather;
}

export const PlaceWeatherDetails = ({weather}: Props) => {

  return (
    <div>
        <h2>What´s the weather like in {weather.name}: 
            &#9838; {weather.weather.map((elem) => elem.description)} &#9838;</h2>
        <p>Temp: {weather.main.temp}&deg;C</p>
        <p>Wind chill: {weather.main.feels_like}&deg;C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Atmospheric pressure on the sea level: {weather.main.pressure}</p>
    </div>
  )

}
