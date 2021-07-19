import React, { useEffect } from 'react'
import "../css/StartAnime.css"
import gsap from 'gsap'
import { Power1, Power4 } from "gsap";

function StartAnime() {
    useEffect(() => {
        const tl = gsap.timeline()
        tl.to(".hidddentxt", { y: -225, duration: 1, ease: Power4.easeOut, stagger: 0.05 })
        tl.to(".start-txt", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.3 }, "-=1")
        tl.to(".hidddentxt", { y: 225, duration: 1.1, ease: Power4.easeIn, stagger: { each: 0.05, from: "end" } })
        tl.to(".start-txt", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 0.4, ease: Power1.easeIn }, "-=0.5")
        tl.to(".start-txt", { display: "none" }, "-=0.4")
        tl.from(".weather-container", { display: "none" })
    }, [])
    return (
        <div className="start-txt">
            <div>
                <h1>
                    <span className="hidddentxt">Weather</span>
                </h1>
                <h1>
                    <span className="hidddentxt">Forecast</span>
                </h1>
            </div>
        </div>
    )
}

export default StartAnime
