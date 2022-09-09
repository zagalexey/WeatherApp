import React, {useEffect, useRef, useState} from 'react';

import './App.css';

import WeatherApp from "./components/WeatherApp";
import BgWrapper from "./components/BgWrapper";
import NoResultsWrapper from "./components/NoResultsWrapper";

function App() {
    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                onWeatherSearch()
            }
        })
    }, [])

    const onInput: any = useRef()
    const [data, setData] = useState({
        current: {
            condition: {
                text: 'Nothing',
                icon: undefined
            },
            temp_c: 0,
            wind_kph: 0,
            humidity: 0,
            cloud: 0,
        },
        location: {
            name: 'Nothing',
            country: 'Nothing'
        }
    })
    const [response, setResponse] = useState(false)

    const onWeatherSearch = (): void => {
        const API_KEY = 'bc6cfc1220234fd390d121843222006'
        const cityName = onInput.current.value
        const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`

        fetch(`${URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `
              location {
                name,
                country
              },
              current {
                tamp_c,
                wind_kph,
                humidity,
                cloud
              }
            `
            })
        })
            .then(res => res.json())
            .then(data => {
                setData({
                    current: {
                        condition: {
                            text: data.current.condition.text,
                            icon: data.current.condition.icon
                        },
                        temp_c: data.current.temp_c,
                        wind_kph: data.current.wind_kph,
                        humidity: data.current.humidity,
                        cloud: data.current.cloud

                    },
                    location: {
                        name: data.location.name,
                        country: data.location.country
                    }
                })
                setResponse(true)
                console.log(data)
            }).catch(() => {
            setResponse(false)
        })
    }

    return (
        <div className="App">
            <BgWrapper>
                <div className="control-panel">
                    <div className={'input-area'}>
                        <input placeholder={'Search'} id={'input'} type="text"
                               ref={onInput}/>
                        <i>
                            <svg
                                height="50px" id="Layer_1" version="1.1"
                                viewBox="0 0 512 512" width="50px" xmlSpace="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink">
                                <path
                                    d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z"/>
                            </svg>
                        </i>
                    </div>
                </div>
                {!response
                    ?
                    <NoResultsWrapper>
                        <p>No results</p>
                    </NoResultsWrapper>
                    :
                    <WeatherApp city={data.location.name}
                                country={data.location.country}
                                tempC={data.current.temp_c}
                                condition={data.current.condition.text}
                                iconNumber={data.current.condition.icon}
                                wind={data.current.wind_kph}
                                humidity={data.current.humidity}
                                cloud={data.current.cloud}/>
                                }
            </BgWrapper>
        </div>
    );
}

export default App;
