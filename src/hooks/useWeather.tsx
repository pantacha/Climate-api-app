import React, { useMemo, useState } from 'react'
import axios from 'axios';
import { z } from "zod";
import { Country, FormElements } from '../types';

// ZOD --SCHEMA--
const Weather = z.object({
    name: z.string(),
    main: z.object({
        feels_like: z.number(),
        grnd_level: z.number(),
        humidity: z.number(),
        pressure: z.number(),
        sea_level: z.number(),
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    }),
    weather: z.array(
        z.object({
            description: z.string(),
        })
    )
});

export type Weather = z.infer<typeof Weather>;

const initialState = {
    name: '',
    main: {
        feels_like: 0,
        grnd_level: 0,
        humidity: 0,
        pressure: 0,
        sea_level: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
    weather: []
}

export const useWeather = () => {

  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getCurrentWeather = async (item: FormElements) => {
    // console.log('search weather..');
    const appId = import.meta.env.VITE_API_KEY;
    
    setLoading(true);
    setWeather(initialState);
    try {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${item.city},
                            ${item.country}&appid=${appId}`;
        const {data} = await axios.get(geoUrl);
        if(!data[0]){
            setNotFound(true);
            return;
        }
        const {lat, lon} = data[0];

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appId}`;
        const {data: weatherResult} = await axios.get(weatherUrl);

        const result = Weather.safeParse(weatherResult);
        console.log(result);
        if(result.success){
            setWeather(result.data);
        }
    } catch (error) {
        console.log('error in tha api call', error);
    } finally {
        setLoading(false);
    }
  }

  const hasInitialPlace = useMemo(() => weather.name, [weather])

  return {
    getCurrentWeather,
    weather,
    hasInitialPlace,
    loading,
    notFound
  }

}
