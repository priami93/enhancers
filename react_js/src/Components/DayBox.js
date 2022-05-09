import * as React from 'react';
import moment from 'moment';
import { useSelector } from "react-redux";
import { selectWeatherForecast } from "../redux/slices/weatherSlices";
import WeatherDayBox from "./WeatherDayBox"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const DayBox = () => {
    const weather_forecast = useSelector(selectWeatherForecast);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        infinite: false,
        adaptiveHeight: true,
        dotsClass: 'slick-dots !bottom-[8px]',
        className: 'h-full pl-3 pr-3',
    };

    const days = [];

    for (let i = 0; i < 7; i++) {
        let weather = weather_forecast?.daily?.filter((w, index) => index === i);
        days[i] = {
            date: moment().add(i, 'days'),
            weather: weather && weather.length ? weather[0] : null,
        }
    }
  
    return (
        <Slider className='h-full' {...settings}>
            {days.map((data, i) => (
                <WeatherDayBox
                    customStyle={{ height: '100%', borderRadius: '25px', backgroundColor: 'rgba(255,255,255,0.1)', boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)' }}
                    key={i}
                    day={data.date}
                    temperature={data.weather?.temp?.day}
                    weather={data.weather?.weather?.length ? data.weather.weather[0].main : '-'}
                />
            ))}
        </Slider>
    );
};

export default DayBox;