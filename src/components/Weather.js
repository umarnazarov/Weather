import React, { useEffect, useRef, useState } from 'react'
import StartAnime from "./StartAnime"
import "../css/Weather.css"
import axios from "axios";
import gsap from 'gsap/gsap-core';
import { Power1 } from "gsap";
import DoubleRing from "../DoubleRing.svg"


function Weather() {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState("Tashkent")
    const cityRef = useRef("Tashkent")
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: { q: location, days: '3' },
        headers: {
            'x-rapidapi-key': 'a13fcb8a2amsh9aa4ad026a2c2d9p1d441cjsn335a1d54f338',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.request(options)
                const data = res.data
                setWeather(data)
            } catch (e) {
                console.error(e);
            }
            setLoading(false)
        }
        return fetchData()
    }, [location])
    useEffect(() => {
        const tl = gsap.timeline()
        tl.from(".weather-container", { opacity: 0, delay: 2.3, duration: 0.5, ease: Power1.easeIn })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLocation(cityRef.current.value)
    }

    console.log(weather)
    return (
        <main>
            <StartAnime />
            <div className="weather-container">
                <div className="w-search">
                    <h1><a href="/">#wforcast</a></h1>
                    <form onSubmit={(e) => handleSubmit(e)} className="w-form">
                        <input ref={cityRef} placeholder="Search city" />
                    </form>
                </div>
                {
                    !loading ?
                        <div className="weather-content">
                            <div className="current-weather">
                                <div className="current-weather-info">
                                    <h1 className="current-location">{weather && weather.location.name + ", " + weather.location.country}</h1>
                                    <h5 className="cuurent-time">Right Now</h5>
                                    <img className="current-img" src={weather && weather.current.condition.icon} />
                                    <h4 className="current-condition">{weather && weather.current.condition.text}</h4>
                                </div>
                                <div>
                                    <h1 className="current-degree">{weather && weather.current.temp_c}&deg;</h1>
                                    <p className="current-feel">Feels like {weather && weather.current.feelslike_c}&deg;</p>
                                </div>
                            </div>
                            <div className="forecast">
                                {weather && weather.forecast.forecastday.map(d => {
                                    return (
                                        <div key={d.date} className="forecast-day">
                                            <span>{d.date}</span>
                                            <h1>{d.day.avgtemp_c}&deg;</h1>
                                            <img src={d.day.condition.icon} />
                                            <p>{d.day.condition.text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div> :
                        <img id="load-anim" src={DoubleRing} />
                }
                <span className="powered">Powered by Umar Nazarov</span>
            </div>
        </main>
    )

}

export default Weather
