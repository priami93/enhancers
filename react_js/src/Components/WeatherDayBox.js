import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import moment from 'moment';


const WeatherDayBox = ({ day, temperature, weather, customStyle }) => {
	let img;
	switch (weather) {
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

	return (
		<Card className='m-auto ml-[15px] mr-[15px]' sx={customStyle}>
			{day ? (
				<CardActionArea className='h-full flex flex-col'>
					<CardContent className='h-[35%] text-center text-[20px] text-white font-primary font-semibold' sx={{ padding: '20px 0px 0px' }}>
						{moment(day).format('dddd')}
					</CardContent>
					<CardContent className='h-[25%] text-center !pb-0' sx={{ padding: '0' }}>
						<span className="text-white text-[42px] font-semibold font-primary" style={{}}>
							{parseFloat(temperature).toFixed(0)}°
						</span>
					</CardContent>

					<CardContent className='h-[40%] text-center !pt-3'>
						<CardMedia
							component="img"
							image={img ? require("../Assets/images/" + img) : null}
							alt={weather}
							className="pt-0 pl-[15px] pr-[15px]"
						/>
					</CardContent>
				</CardActionArea>
			) : (
				<CardActionArea>
					<CardContent className='text-center' sx={{ padding: '45px 20px 0px' }}>
						<span className="text-white" style={{ fontSize: '50px', fontWeight: 'bold', letterSpacing: 0, lineHeight: '76px' }}>
							{parseFloat(temperature).toFixed(0)}°
						</span>
					</CardContent>

					<CardMedia
						component="img"
						image={img ? require("../Assets/images/" + img) : null}
						alt={weather}
						className="p-[28px]"
					/>
				</CardActionArea>
			)}
		</Card>
	);
};

export default WeatherDayBox;