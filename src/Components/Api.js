import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Api() {
    const [location, setLocation] = useState('')
    const [region, setRegion] = useState('')
    const [country, setCountry] = useState('')
    const [icon, setIcon] = useState('')
    const [text, setText] = useState('')

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: 'Port Moresby'},
        headers: {
            'X-RapidAPI-Key': '1ffe563f75msha16936234a75061p1c62afjsn3971df74211e',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    useEffect(() => {
        axios.request(options).then(function (response) {
            console.log(response.data.current.condition.icon)
            setLocation(response.data.location.name)
            setRegion(response.data.location.region)
            setCountry(response.data.location.country)
            setIcon(response.data.current.condition.icon)
            setText(response.data.current.condition.text)
        }).catch(function (error) {
            console.error(error)
        });
    }, [])

    return (
        <>
            {location && <div style={{ color: 'white' }}>Location: {location}</div>}
            {region && <div style={{ color: 'white' }}>Region: {region}</div>}
            {country && <div style={{ color: 'white' }}>Country: {country}</div>}
            {icon && <img src={icon} style={{ width: '50px', background: 'transparent' }} alt='a' />}
        </>
    )
}
