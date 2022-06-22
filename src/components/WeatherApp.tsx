import React from 'react';

import '../styles/WatchApp.css'

interface WatchAppProps {
    city: string,
    tempC: number,
    condition: string,
    totalTime: string,
    iconNumber: string | undefined
}

const WeatherApp = ({city, tempC, condition, totalTime, iconNumber}: WatchAppProps) => {

    const tmpC = `${tempC} ℃`
    const insertedTime = totalTime.split(' ')
    const localTimeDays = insertedTime[0]
    const localTimeHours = insertedTime[1]
    // let icon: string
    let iconUrl: any

    // console.log(iconNumber)
    let test = iconNumber?.split('/')

    if (test !== undefined) {
        // icon = test[test.length - 1]
        // console.log(typeof test[test.length - 1])
        iconUrl = require(`../icons/day/${test[test.length - 1]}`)
    }

    return (
        <div className={'watch-app'}>
            <p className={'watch-app__date'}>{localTimeDays}</p>
            <p className={'watch-app__clock'}>{localTimeHours}</p>
            <p className={'watch-app__city'}>{city}</p>
            {iconNumber === undefined ? <span>No Icon yet</span> :
                <span className={'watch-app__icon'}>
                <img src={iconUrl}
                     alt={'weather-icon'}/>
            </span>}
            <p className={'watch-app__temp'}>{tmpC}</p>
            <p className={'watch-app__condition'}>{condition}</p>
        </div>
    );
};

export default WeatherApp;