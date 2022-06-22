import React, {useRef, useState} from 'react';
import './App.scss';
import WeatherApp from "./components/WeatherApp";
import BgWrapper from "./components/BgWrapper";
import NoResultsWrapper from "./components/NoResultsWrapper";

// interface onData {
//     current: {
//         condition: {
//             text: string
//         }
//         temp_c: number
//     }
//     location: {
//         name: string
//     }
// }

function App() {

    const onInput: any = useRef()
    const [data, setData] = useState({
        current: {
            condition: {
                text: 'Nothing',
                icon: undefined
            },
            temp_c: 25
        },
        location: {
            name: 'Nothing',
            localtime: 'Nothing'
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
                localtime
              },
              current {
                tamp_c,
                temp_f
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
                        temp_c: data.current.temp_c
                    },
                    location: {
                        name: data.location.name,
                        localtime: data.location.localtime
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
                    <input type="text"
                           ref={onInput}/>
                    <button onClick={onWeatherSearch}>Search</button>
                </div>
                <div className={'divider'}></div>
                {!response
                    ?
                    <NoResultsWrapper>
                        <p>No results yet...</p>
                    </NoResultsWrapper>
                    :
                    <WeatherApp city={data.location.name}
                                tempC={data.current.temp_c}
                                condition={data.current.condition.text}
                                totalTime={data.location.localtime}
                                iconNumber={data.current.condition.icon}/>}
            </BgWrapper>
        </div>
    );
}

export default App;
