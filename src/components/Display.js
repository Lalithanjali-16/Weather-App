import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css'
function Display() {
    const [city,setCity]=useState('')
    const [weather,setWeather]=useState(null);
    const [error,setError]=useState('');
    const apikey='cc405d2baf56ece2981de2a042a29d8d';
    
    const fetchWeather=()=> {
        if (!city) return;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
      .then((res)=>{
        setWeather(res.data)
        console.log(res.data); 
        setError('')
      })
      .catch(error =>{
        console.log('Error fetching weather')
        setWeather(null)
      })
    }
    const kelvinToCelsius=(k) =>(k-273.15).toFixed(2)
  return (
    <div className='full'>
        <div className='child'>
            <div className='top'>
                <h1>Weather App</h1>
                <input value={city} onChange={e=>setCity(e.target.value)} placeholder='Enter city'></input>
                <button onClick={fetchWeather}><i class="fa-solid fa-magnifying-glass"></i></button>
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>
            {weather && (
                    <div>
                        <h1>Weather in {weather.name}</h1>
                        <div className="cards">
                            <div className="eachcard">
                                <div className='name'>
                                    <i className="fa-solid fa-temperature-high"></i> Temperature:{' '}
                                </div>
                                {kelvinToCelsius(weather.main.temp)} °C
                            </div>
                            <div className="eachcard">
                                <div className='name'>
                                <i class="fa-solid fa-cloud"></i> Condition:{' '}
                                </div>
                                {(weather.weather[0].description)} 
                            </div>
                            <div className="eachcard">
                                <div className='name'>
                                <i class="fa-solid fa-droplet"></i> Humidity:{' '}
                                </div>
                                {(weather.main.humidity)} %
                            </div>
                            <div className="eachcard">
                                <div className='name'>
                                <i className="fa-solid fa-temperature-high"></i> Wind:{' '}
                                </div>
                                {(weather.wind.speed)} m/s
                            </div>
                        </div>
                    </div>
                
            )}
            </div>
    </div>
  )
}

export default Display
