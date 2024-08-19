import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import searchicon from '../Assets/search.png';
import windicon from '../Assets/wind.png';
import humidityicon from '../Assets/humidity.png';


export default function Main() {
  const inpurRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city)=>{
    if(city === ""){
      alert("Enter City Name");
      return;
    }
    try{

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d5912acf1e7e9ffc2fdf1df553bfbbf0`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert("City Not Found");
        return;
      }

      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

      })

    }catch(error){
      setWeatherData(false);
      console.error("Error in feteching weather data");
    }
  }

  useEffect(()=>{
    search("visakhapatnam"); 
  },[])

  return (
    <div className='weather'>
      <div className='searchbar'>
        <input type='text'
        ref={inpurRef}
        placeholder='Enter a city name'
        />

        <img src={searchicon} alt='' 
        onClick={() => search(inpurRef.current.value)}
        />
      </div>

      {weatherData?<>
      
      <img src={weatherData.iconUrl} alt='' className='weather-icon'/>
      <p  className='temperature'>{weatherData.temperature}&deg;C</p>
      <p className='location' >{weatherData.location}</p>

      <div className='weather-data'>
        <div className='col'>
          <img src={humidityicon} alt='' />
          <div>
            <p className='data'>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className='col'>
          <img src={windicon} alt='' />
          <div>
            <p className='data'>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
          </div>
        </div>

      </div>

      </>:<></>}
      
    </div>
  )
}
