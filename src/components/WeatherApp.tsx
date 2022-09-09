import React from 'react';

import '../styles/WeatherApp.css'

interface weatherAppProps {
    city: string,
    country: string,
    tempC: number,
    cloud: number,
    wind: number,
    humidity: number,
    condition: string,
    iconNumber: string | undefined
}

const WeatherApp = ({city, tempC, condition, iconNumber, country, cloud, humidity, wind}: weatherAppProps) => {

    const tmpC = `${tempC} ℃`
    const location = `${city}, ${country}`
    let iconUrl: any
    let test = iconNumber?.split('/')

    if (test !== undefined) {
        iconUrl = require(`../icons/day/${test[test.length - 1]}`)
    }

    return (
        <div className={'weather-app'}>
            <p className={'weather-app__loctitle'}><i className="fa-solid fa-location-crosshairs"></i>Your Location Now
            </p>
            <p className={'weather-app__location'}>{location}</p>
            {iconNumber === undefined ? <span>No Icon yet</span> :
                <span className={'weather-app__icon'}>
                <img src={iconUrl}
                     alt={'weather-icon'}/>
            </span>}
            <p className={'weather-app__condition'}>{condition}</p>
            <p className={'weather-app__temp'}>{tmpC}</p>
            <div className={'weather-app__additional'}>
                <div className={'weather-app__additional__col'}>
                    <i className="fa-solid fa-wind"></i>
                    <span>{wind + 'km/h'}</span>
                </div>
                <div className={'weather-app__additional__col'}>
                    <i className="fa-solid fa-droplet"></i>
                    <span>{humidity + '%'}</span>
                </div>
                <div className={'weather-app__additional__col'}>
                    <i className="fa-solid fa-cloud"></i>
                    <span>{cloud + '%'}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;