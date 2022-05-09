import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stepper, Step, StepLabel, StepConnector, styled } from '@mui/material';
import moment from 'moment';
import { fetchWeatherForecastAction, selectWeatherForecast } from "../redux/slices/weatherSlices";

const TemperatureBox = ({ city_coord }) => {
	const dispatch = useDispatch();

	const weather_forecast = useSelector(selectWeatherForecast);

	useEffect(() => {
		dispatch(fetchWeatherForecastAction(city_coord));
	}, [city_coord]);


	const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
		backgroundColor: 'white',
		zIndex: 1,
		color: '#fff',
		width: 20,
		height: 20,
		margin: 'auto 8px auto',
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		...(ownerState.active && {
			width: 30,
			height: 30,
		}),
	}));

	function ColorlibStepIcon(props) {
		const { active, completed, className } = props;

		return (
			<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			</ColorlibStepIconRoot>
		);
	}

	function hourlyData(){
		if(weather_forecast){
			return weather_forecast.hourly.filter(w => moment().isSame(moment.unix(w.dt), 'day'))
		}
		return [];
	}

	return (
		<Box className="h-full overflow-auto pb-6 no-scrollbar" sx={{ borderRadius: '35px', background: 'linear-gradient(135deg, #5374E7 0%, #77B9F5 100%)', boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)' }} >
			<p className="font-bold text-lg text-white text-center pt-8">Now</p>
			<Stepper orientation="vertical"
				connector={
					<StepConnector
						classes={{
							lineVertical: '!min-h-[90px] !border-l-[8px] !border-white',
						}}
						sx={{ margin: '-20px auto' }}
					/>
				}
			>
				{hourlyData().map((data, index) => (
					<Step key={data.dt} className="flex m-auto w-full">
						<span className="w-1/3 m-auto text-right">
							{index == 0 ? (
								<p className="text-white text-[40px] font-bold">{parseFloat(data.temp).toFixed(0)}°</p>
							) : (
								<p className="text-white text-3xl font-light">{parseFloat(data.temp).toFixed(0)}°</p>
							)}
						</span>
						<StepLabel className="m-auto z-10 text-center" StepIconComponent={ColorlibStepIcon} classes={{ iconContainer: '!p-0' }} ></StepLabel>
						<span className="w-1/3 m-auto text-left">
							<p className="text-white text-xl font-light">{index > 0 ? moment.unix(data.dt).format('HH A') : ''}</p>
						</span>
					</Step>
				))}
			</Stepper>
		</Box >
	);
};

export default TemperatureBox;
