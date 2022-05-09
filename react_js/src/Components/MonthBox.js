import {Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import moment from 'moment';
import { useSelector } from "react-redux";
import { selectWeatherForecast } from "../redux/slices/weatherSlices";


const MonthBox = () => {
    const weather_forecast = useSelector(selectWeatherForecast);

    let weather_filtered = weather_forecast?.daily?.filter((w, index) => index === 7);
    let weather = weather_filtered.length ? weather_filtered[0] : null;
    let weather_data = weather?.weather?.length ? weather.weather[0] : null;

    function getImg() {
        let img;
        switch (weather_data.main) {
            case 'Clouds':
                img = "Cloudy.png";
                break;
            case 'Clear':
                img = "Sunny.png";
                break;
            case 'Thunderstorm':
            case 'Drizzle':
                img = "OccLightRain.png";
                break;
            case 'Rain':
                img = "ModRainSwrsDay.png";
                break;
        }
        return img;
    }


    return (
        <Card className='h-full p-7 shadow-none' style={{ backgroundColor: 'transparent' }}>
            <CardActionArea className='h-full !rounded-[25px] ' style={{ backgroundColor: 'rgba(255,255,255,0.1)', boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)' }}>
                <CardContent className='h-full flex flex-row !pt-0' sx={{ padding: '20px 0px 0px' }}>
                    <div className='h-full flex flex-col w-2/5 p-7'>
                        <div className='flex-grow text-center text-[20px] text-white font-primary font-semibold'>
                            {moment.unix(weather.dt).format('ddd, D MMM')}
                        </div>
                        <div className='flex-grow text-center text-[20px] text-white font-primary font-semibold'>
                            <CardMedia
                                component="img"
                                image={require("../Assets/images/" + getImg(weather))}
                                alt={weather}
                                className="p-[28px 10px]"
                            />
                        </div>
                    </div>
                    <div className='h-full flex flex-col w-3/5 p-7 pt-5 overflow-auto'>
						<span className="text-white text-[36px] font-semibold font-primary" style={{}}>
							{parseFloat(weather?.temp?.day).toFixed(0)}°
						</span>
                        <span className='text-left text-[18px] text-white font-primary font-light normal-case'>
                            {weather_data?.description}
                        </span>
                        <span className='text-left text-[18px] text-white font-primary font-light normal-case pt-3 pb-3'>
                            The high will be {parseFloat(weather?.temp?.max).toFixed(0)}°C, the low will be {parseFloat(weather?.temp?.min).toFixed(0)}°C
                        </span>
                        <span className='text-left text-[18px] text-white font-primary font-light normal-case'>
                            <p>Humidity {parseFloat(weather?.humidity).toFixed(0)}%</p>
                            <p>UV {parseFloat(weather?.uvi).toFixed(0)}</p>
                            <p>Dew point {parseFloat(weather?.dew_point).toFixed(0)}°C</p>
                        </span>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MonthBox;