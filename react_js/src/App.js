import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchWeatherAction, selectWeather} from "./redux/slices/weatherSlices";
import {Container, Button, Card, CardContent, CardMedia, CardActionArea, TextField} from '@mui/material';
import moment from 'moment';
import WeatherDayBox from "./Components/WeatherDayBox"
import TemperatureBox from "./Components/TemperatureBox"
import CityWeatherBox from "./Components/CityWeatherBox"
import TabBox from "./Components/TabBox"

function App() {
    const [otherCities, setOtherCities] = useState(['London', 'Madrid']);
    const [main_city, setMainCity] = useState('Florence');

    const weather = useSelector(selectWeather);

    function getCityWeather(city) {
        if (weather && weather.length) {
            let result = weather.filter(c => c.name == city);
            return result.length ? result[0] : null;
        }
        return null;
    }

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchWeatherAction(main_city))

        for (let city of otherCities) {
            dispatch(fetchWeatherAction(city));
        }
    }, []);


    return (
        <Container className="!pl-0 !pr-0 overflow-auto" sx={{maxWidth: '1440px'}} maxWidth={false}>
            <div className="h-full w-full flex flex-wrap  min-h-[1040px] md:min-h-0"
                 style={{padding: '50px 50px 40px'}}>
                <div className="w-full h-1/2 md:h-2/3 lg:w-2/3 lg:h-full min-h-[1100px] sm:min-h-[740px]">
                    <div className="w-full sm:h-1/2 min-h-[300px]">
                        {getCityWeather(main_city) ? (
                            <div
                                className="flex h-full bg-[url('../public/images/bg4.jpg')] bg-no-repeat bg-cover bg-left-top rounded-3xl min-h-[400px] md:min-h-0"
                                style={{boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)'}}>
                                <WeatherDayBox
                                    customStyle={{
                                        margin: 'auto -50px',
                                        height: '280px',
                                        width: '140px',
                                        borderRadius: '0 25px 25px 0',
                                        maxWidth: 345,
                                        background: 'linear-gradient(180deg, #5374E7 0%, #77B9F5 100%)',
                                        boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)'
                                    }}
                                    temperature={getCityWeather(main_city).main ? getCityWeather(main_city).main.temp : '-'}
                                    weather={getCityWeather(main_city).weather && getCityWeather(main_city).weather.length ? getCityWeather(main_city).weather[0].main : '-'}
                                />
                                <div className="pt-28 pl-28">
                                    <h1 className="text-4xl font-semibold text-primary font-poppins">
                                        {getCityWeather(main_city).name}
                                    </h1>

                                    <p className="text-xl font-medium text-primary pt-2">
                                        {moment.unix(getCityWeather(main_city).dt).format('dddd D, MMMM')}
                                    </p>

                                    <p className="text-xl font-light text-primary pt-2 capitalize">
                                        {getCityWeather(main_city).weather && getCityWeather(main_city).weather.length ? getCityWeather(main_city).weather[0].description : '-'}
                                    </p>

                                </div>
                            </div>
                        ) : (
                            <div
                                className="bg-[url('../public/images/bg4.jpg')] bg-no-repeat bg-cover bg-left-top rounded-3xl"
                                style={{boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)'}}/>
                        )}
                    </div>


                    <div className="w-full h-1/2 flex flex-col md:flex-row min-h-[700px] md:min-h-0">

                        <div className="w-full h-1/2 md:h-full md:w-1/3 flex flex-col">
                            <div className="flex-grow h-full pt-[45px]">
                                <p className="text-3xl text-primary pl-6 font-semibold leading-10">Today</p>
                            </div>
                            {getCityWeather(main_city) ? (
                                <div className="flex-grow pt-4" style={{height: 'calc(100% - 89px)'}}>
                                    <TemperatureBox city_coord={getCityWeather(main_city).coord}/>
                                </div>
                            ) : null}
                        </div>

                        <div className="w-full h-1/2 md:h-full pt-[30px] md:w-2/3 md:pl-8">
                            <TabBox></TabBox>
                        </div>
                    </div>
                </div>

                <div className="w-full h-1/2 md:h-1/3 lg:w-1/3 lg:h-full md:min-h-[740px] min-w-[160px]">
                    <div className="w-full sm:h-1/2 flex flex-col">
                        <Button
                            className="!p-[25px] h-1/3 w-full flex-grow"
                            style={{backgroundColor: "transparent"}}
                            startIcon={
                                <img
                                    src={require("./Assets/images/Plus.png")}
                                    loading="lazy"
                                />
                            }
                        >
                            <p className="capitalize text-xl font-primary font-bold" style={{color: '#01175F'}}>
                                Add City
                            </p>
                        </Button>

                        <div className="w-full h-1/3 min-h-[140px]">
                            <CityWeatherBox city={weather?.filter(c => c.name == otherCities[0])} style={{
                                background: 'linear-gradient(100deg, #011354 0%, #5B9FE3 100%)',
                                boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)'
                            }}/>
                        </div>

                        <div className="w-full h-1/3 min-h-[140px]">
                            <CityWeatherBox city={weather?.filter(c => c.name == otherCities[1])} style={{
                                background: 'linear-gradient(100deg, #464C64 0%, #99A9B9 100%)',
                                boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)'
                            }}/>
                        </div>

                    </div>
                    <div className="w-full sm:h-1/4 flex flex-col">
                        <div className="flex-grow pt-[45px]">
                            <p className="text-3xl text-primary pl-10 font-semibold leading-10">Search</p>
                        </div>
                        <div className="flex-grow h-full pl-7 pr-7 pt-3">
                            <Card className='h-full bg-white !rounded-[25px]'
                                  style={{boxShadow: 'box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17)'}}>
                                <CardActionArea className='h-full'>
                                    <CardContent className='h-full flex flex-row !pt-0' sx={{padding: '20px 0px 0px'}}>
                                        <input className="w-full p-7" placeholder="ex Miami"
                                               style={{outlineColor: 'white'}}/>

                                        <Button
                                            className="p-[50px] !min-w-[20px] !w-[56px] !block !rounded-[25px]"
                                            style={{background: "linear-gradient(100deg, #5374E7 0%, #77B9F5 100%)"}}
                                            startIcon={
                                                <img
                                                    className="m-auto ml-2"
                                                    src={require("./Assets/images/Search.png")}
                                                    loading="lazy"
                                                />
                                            }
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </div>
                    <div className="w-full sm:h-1/4 flex flex-col">
                        <div className="flex-grow pt-[30px]">
                            <p className="text-3xl text-primary pl-10 font-semibold leading-10">Localization</p>
                        </div>
                        <div className="flex-grow h-full pl-7 pr-7 pt-3">
                            <Card className='h-full bg-white !rounded-[25px]'
                                  style={{boxShadow: 'box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17)'}}>
                                <CardActionArea className='h-full'>
                                    <CardContent className='h-full flex flex-row !pt-0' sx={{padding: '20px 0px 0px'}}>
                                        <Button
                                            className="p-[50px] w-full !block"
                                            style={{background: "linear-gradient(100deg, #5374E7 0%, #77B9F5 100%)"}}
                                            startIcon={
                                                <img
                                                    className="m-auto"
                                                    src={require("./Assets/images/Location.png")}
                                                    loading="lazy"
                                                />
                                            }
                                        >
                                            <p className="capitalize text-xl font-primary font-semibold text-white pt-2">
                                                Add localization
                                            </p>
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    );
}

export default App;


