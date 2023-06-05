import React from 'react'
import Styles from '../Styles/cards.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CardName from './CardsName'

export default function Card(props) {
  const [location, setLocation] = useState('')
  const [name, setName] = useState('')
  const [temp, setTemp] = useState('')
  const [text, setText] = useState('')
  const [windDire, setWindDire] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [humidity, setHumidity] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [visibility, setVisibility] = useState('')
  const [uvIndex, setUvIndex] = useState('')
  const [precip, setPrecip] = useState('')
  const [pressure, setPressure] = useState('')
  const [zeroDay, setZeroDay] = useState('')
  const [plusOneDay, setPlusOneDay] = useState('')
  const [plusTwoDay, setPlusTwoDay] = useState('')
  const [zeroDayMin, setZeroDayMin] = useState('')
  const [zeroDayMax, setZeroDayMax] = useState('')
  const [plusOneDayMin, setPlusOneDayMin] = useState('')
  const [plusOneDayMax, setPlusOneDayMax] = useState('')
  const [plusTwoDayMin, setPlusTwoDayMin] = useState('')
  const [plusTwoDayMax, setPlusTwoDayMax] = useState('')
  
  const [loading, setLoading] = useState(false)

  const handlOnChange = (event) => {
    setName(event.target.value);
  }

  useEffect(() => {
    console.log(name)
    currentWeatherUsingCityName(name);
    forcastWeatherUsingCityName(name);
  }, [name])

  function currentWeatherUsingCityName(name) {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: `${name}` },
      headers: {
        'X-RapidAPI-Key': '1ffe563f75msha16936234a75061p1c62afjsn3971df74211e',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setLocation(response.data.location.name)
      setTemp(response.data.current.temp_c)
      setText(response.data.current.condition.text)
      setWindDire(response.data.current.wind_degree)
      setWindSpeed(response.data.current.wind_kph)
      setHumidity(response.data.current.humidity)
      setFeelsLike(response.data.current.feelslike_c)
      setVisibility(response.data.current.vis_km)
      setUvIndex(response.data.current.uv)
      setPrecip(response.data.current.precip_mm)
      setPressure(response.data.current.pressure_mb)
    }).catch(function (error) {
      console.error(error);
    });
  }

  function forcastWeatherUsingCityName(name) {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: { q: `${name}`, days: '3' },
      headers: {
        'X-RapidAPI-Key': '1ffe563f75msha16936234a75061p1c62afjsn3971df74211e',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    setLoading(true)
    axios.request(options).then(function (response) {
      setZeroDay(response.data.forecast.forecastday[0].date)
      setZeroDayMin(response.data.forecast.forecastday[0].day.mintemp_c)
      setZeroDayMax(response.data.forecast.forecastday[0].day.maxtemp_c)
      setPlusOneDay(response.data.forecast.forecastday[1].date)
      setPlusOneDayMin(response.data.forecast.forecastday[1].day.mintemp_c)
      setPlusOneDayMax(response.data.forecast.forecastday[1].day.maxtemp_c)
      setPlusTwoDay(response.data.forecast.forecastday[2].date)
      setPlusTwoDayMin(response.data.forecast.forecastday[2].day.mintemp_c)
      setPlusTwoDayMax(response.data.forecast.forecastday[2].day.maxtemp_c)
    }).catch(function (error) {
      console.error(error);
    });
  }

  var image;
  switch (text) {
    case 'Partly cloudy':
      image = require("../assets/partly cloudy.png");
      break;
    case 'Sunny':
      image = require("../assets/sunny.png");
      break;
    case 'Mist':
      image = require("../assets/mist.png");
      break;
    case 'Moderate rain':
      image = require("../assets/moderate rain.png");
      break;
    case 'Light snow':
      image = require("../assets/light snow.png");
      break;
    case 'Overcast':
      image = require("../assets/overcast.png");
      break;
    case 'Clear':
      image = require("../assets/clear.png");
      break;
    case 'Light rain':
      image = require("../assets/light rain.png");
      break;
    case 'Patchy light rain with thunder':
      image = require("../assets/rain with thunder.png");
      break;
    default:
      image = require("../assets/freezing fog.png");
  }

  let dewPoint = (temp) - [(100 - humidity) / 5];


  var feelsLikeFootnote;
  if (feelsLike > temp) {
    feelsLikeFootnote = 'Humidity is making it feel warmer.'
  } else if (feelsLike < temp) {
    feelsLikeFootnote = 'Wind is making it feel colder.'
  } else if (feelsLike === temp) {
    feelsLikeFootnote = 'Similar to the actual temp.'
  }


  var visibilityFootnote;
  if (visibility <= 1) {
    visibilityFootnote = 'Fog is affecting visibility.'
  } else if (visibility > 1 && visibility <= 3) {
    visibilityFootnote = 'Light Fog is affecting visibility.'
  } else if (visibility > 3 && visibility <= 6) {
    visibilityFootnote = 'Haze is affecting visibility.'
  } else if (visibility > 6 && visibility <= 10) {
    visibilityFootnote = 'Light haze is affecting visibility.'
  } else {
    visibilityFootnote = `It's perfectly clear right now.`
  }

  var uvIndexMeter = uvIndex * 11;
  var uvIndexFootnote;
  if (uvIndex >= 1 && uvIndex <= 2) {
    uvIndexFootnote = 'No protection needed.'
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    uvIndexFootnote = 'Some protection is required.'
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    uvIndexFootnote = 'Protection is essential.'
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    uvIndexFootnote = 'Extra protection is needed.'
  } else {
    uvIndexFootnote = 'Stay Inside!'
  }

  var pressureDegreeMeasure = 240 - [(pressure - 960) * 3];

  return (
    <div className={`container`}>
      <input type="text" className={Styles.input} onChange={handlOnChange} name="input" placeholder='Enter City Name' />
      {name ?  <div className={Styles.card}>
        <div className={Styles.leftBox}>
          <div className={Styles.icon}>
            <img className={Styles.iconImg} src={image} alt="a" />
          </div>
          {location && <div className={Styles.location}>{location}</div>}
          {temp && <div className={Styles.temp}>{temp.toFixed(0)}<span style={{ fontSize: '43px', background: 'transparent' }}>&deg;C</span></div>}
          {text && <div className={Styles.text}>{text}</div>}
        </div>
        <div className={Styles.rightBox}>
          <div className={Styles.item1}>
            <div className={Styles.titles}><i className="fa-solid fa-up-down" />&nbsp;Min/Max Temperature</div>
            <table style={{ width: '94%', margin: '10px auto 0', background: 'transparent' }}>
              <tr style={{ lineHeight: '30px', background: 'transparent' }}>
                <td style={{ borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', paddingLeft: '3px', background: 'transparent' }}>Min</td>
                {zeroDayMin && <td style={{ fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{zeroDayMin.toFixed(0)}</strong>&deg;C</td>}
                {plusOneDayMin && <td style={{ fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{plusOneDayMin.toFixed(0)}</strong>&deg;C</td>}
                {plusTwoDayMin && <td style={{ fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{plusTwoDayMin.toFixed(0)}</strong>&deg;C</td>}
              </tr>
              <tr style={{ lineHeight: '30px', background: 'transparent', borderBottom: '1px solid white' }}>
                <td style={{ borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', paddingLeft: '3px', background: 'transparent' }}>Max</td>
                {zeroDayMax && <td style={{ fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{zeroDayMax.toFixed(0)}</strong>&deg;C</td>}
                {plusOneDayMax && <td style={{ fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{plusOneDayMax.toFixed(0)}</strong>&deg;C</td>}
                {plusTwoDayMax && <td style={{ fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{plusTwoDayMax.toFixed(0)}</strong>&deg;C</td>}
              </tr>
              <tr style={{ lineHeight: '30px', background: 'transparent' }}>
                <th style={{ borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', background: 'transparent' }}></th>
                {zeroDay && <th style={{ fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{zeroDay}</strong></th>}
                {plusOneDay && <th style={{ fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{plusOneDay}</strong></th>}
                {plusTwoDay && <th style={{ fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent' }}><strong>{plusOneDay}</strong></th>}
              </tr>
            </table>
          </div>
          <div className={Styles.item2}>
            <div className={Styles.titles}><i className="fa-solid fa-wind" />&nbsp;Wind</div>
            <div className={Styles.windDial}>
              <img src={require('../assets/dial.png')} alt='a' />
            </div>
            {windDire && <div className={Styles.dialHand1} style={{ transform: `rotate(-${windDire}deg)` }}></div>}
            {windSpeed && <div className={Styles.windSpeed}><strong>{windSpeed}</strong><br />kph</div>}
          </div>
          <div className={Styles.item2}>
            <div className={Styles.titles}><i className="fa-solid fa-droplet" />&nbsp;Humidity</div>
            {humidity && <div className={Styles.details}><strong>{humidity}</strong>%</div>}
            <div className={Styles.footnote}>The dew point is {dewPoint.toFixed(0)}&deg;C right now.</div>
          </div>
          <div className={Styles.item2}>
            <div className={Styles.titles}><i className="fa-solid fa-temperature-three-quarters" />&nbsp;Feels Like</div>
            {feelsLike && <div className={Styles.details}><strong>{feelsLike.toFixed(0)}</strong>&deg;C</div>}
            <div className={Styles.footnote}>{feelsLikeFootnote}</div>
          </div>
          <div className={Styles.item2}>
            <div className={Styles.titles}><i className="fa-solid fa-gauge" />&nbsp;Pressure</div>
            <div className={Styles.windDial}>
              <img src={require('../assets/pressure dial.png')} alt='a' />
            </div>
            {windDire && <div className={Styles.dialHand} style={{ transform: `rotate(-${pressureDegreeMeasure}deg)` }}></div>}
            {pressure && <div className={Styles.pressureValue}><strong>{pressure}</strong><br />hPa</div>}
          </div>
          <div className={Styles.item2}>
            <div className={Styles.titles}><i className="fa-solid fa-eye" />&nbsp;Visibility</div>
            {visibility && <div className={Styles.details}><strong>{visibility}</strong> km</div>}
            <div className={Styles.footnote}>{visibilityFootnote}</div>
          </div>
          <div className={Styles.item2}>
            <div className={Styles.titles}><i className="fa-solid fa-sun" />&nbsp;UV Index</div>
            {uvIndex && <div className={Styles.details}>{uvIndex}</div>}
            <div className={Styles.uvScale}></div>
            <div className={Styles.dot} style={{ transform: `translateX(${uvIndexMeter}px)` }}></div>
            <div className={Styles.footnote}>{uvIndexFootnote}</div>
          </div>
          <div className={Styles.item2}>
            <div className={Styles.titles}><i className="fa-solid fa-cloud-rain" />&nbsp;Precipitation</div>
            {precip ? <div className={Styles.details}>{precip} mm <br /><p className={Styles.precipSubtext}>in last 24 hour</p></div> :
              <div className={Styles.details}><strong>0 mm</strong><br /><p className={Styles.precipSubtext}>in last 24 hour</p></div>}
          </div>
        </div>
      </div>  : <CardName />}
    </div>
  )
}