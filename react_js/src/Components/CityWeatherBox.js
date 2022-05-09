import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import moment from 'moment';


const CityWeatherBox = ({ city, style }) => {
    let city_weather = city?.length ? city[0] : null

    function getImg(city_weather) {
        let img = null;
        if (city_weather?.weather?.length) {
            switch (city_weather.weather[0].main) {
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
        }
        return img;
    }


    return (
        <Card className='h-full pt-3 pb-3 p-7 !shadow-none' style={{ backgroundColor: 'transparent' }}>
            <CardActionArea className='h-full !rounded-[25px] ' style={style}>
                {city ?
                    <CardContent className='h-full flex flex-row !pt-0' sx={{ padding: '20px 0px 0px' }}>
                        <div className='h-full flex flex-col w-[35%] p-3 pl-5'>
                            <div className='flex-grow text-left text-[26px] text-white font-primary font-semibold'>
                                {city_weather?.name}
                            </div>
                            <div className='flex-grow text-left text-[15px] text-white font-primary font-normal'>
                                {moment.unix(city_weather?.dt).format('dddd D, MMMM')}
                            </div>
                            <div className='flex-grow text-left text-[12px] text-white font-primary font-normal' style={{color:'#bdbdbd'}}>
                                {moment.utc().add(city_weather?.timezone, 'seconds').format('HH:mm A')}
                            </div>
                        </div>
                        <div className='h-full flex flex-col w-[30%] p-3'>
                            <CardMedia
                                component="img"
                                image={getImg(city_weather) ? require("../Assets/images/" + getImg(city_weather)) : null}
                                className="p-[28px 10px] m-auto text-center !w-fit"
                            />
                        </div>
                        <div className='h-full flex flex-col w-[35%] p-3  overflow-auto'>
                            <span className="m-auto text-white text-[50px] font-bold font-primary" style={{}}>
                                {parseFloat(city_weather?.main?.temp).toFixed(0)}°
                            </span>
                        </div>
                    </CardContent>
                    : ''}
            </CardActionArea>
        </Card>
    );
};

export default CityWeatherBox;