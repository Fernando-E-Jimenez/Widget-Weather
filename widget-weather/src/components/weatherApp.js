import {useEffect, useState} from 'react';
import WeatherForm from './weatherForm';
import WeatherMainInfo from './weatherMainInfo';
import styles from './weatherApp.module.css';

export default function WeatherApp(){

    const [weather, setWeather] = useState(null)

    useEffect(()=>{
        loadInfo();
    },[]);

    useEffect(()=>{
        document.title = `Weather | ${weather?.location.name ?? ""}`;
    },[weather]);

    async function loadInfo(city = 'london'){
        try{
            const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);
            const json = await request.json();
            setWeather(json);
            console.log(json);
        } catch {

        }
    }

    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }

    return <div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleChangeCity}/>
        {/* {weather?.current.temp_c} el ? significa que es una propiedad opcional, caso que no exista no tira error */}
        <WeatherMainInfo weather={weather} />
    </div>
}