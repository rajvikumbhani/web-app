import React, { useState} from 'react'
import Styles from '../Styles/Navbar.module.css'

export default function Navbar() {
    var [date, setDate] = useState(new Date());
    let hours = date.getHours()
    let minutes = (date.getMinutes()) < 10 ? '0' + (date.getMinutes()) : (date.getMinutes())
    let seconds = (date.getSeconds()) < 10 ? '0' + (date.getSeconds()) : (date.getSeconds())
    hours = (hours % 12) < 10 ? '0' + (hours % 12) : (hours % 12)
    let ampm = hours>12 ? 'PM' : 'AM'
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var timer = setInterval(()=>setDate(new Date()), 1000)
    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.logo}>WISCONSIN</div>
                <div className={Styles.date}>{date.getDate()} {months[date.getMonth()]}, {date.getFullYear()}, {hours}:{minutes}:{seconds} {ampm}</div>
            </div>
        </>
    )}
