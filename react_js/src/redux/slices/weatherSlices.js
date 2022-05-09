import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//action
export const fetchWeatherAction = createAsyncThunk(
    "weather/fetch",
    async (city, { rejectWithValue, getState, dispatch }) => {
        try {
            let { data } = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + process.env.REACT_APP_WEATHER_API_KEY
            );
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
);

export const fetchWeatherForecastAction = createAsyncThunk(
    "weatherForecast/fetch",
    async (city_coord, { rejectWithValue, getState, dispatch }) => {
        try {
            let city_lat = city_coord ? city_coord.lat : null;
            let city_lng = city_coord ? city_coord.lon : null;
            let { data } = await axios.get(
               'https://api.openweathermap.org/data/2.5/onecall?lat='+city_lat+'&lon=' + city_lng + '&units=metric&appid=' + process.env.REACT_APP_WEATHER_API_KEY
            );
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
);

export const selectWeather = (state) => state.weather;
export const selectWeatherForecast = (state) => state.weather_forecast;


//slice
const weatherSlice = createSlice({
    name: "weather",
    initialState: {},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchWeatherAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchWeatherForecastAction.pending, (state, action) => {
            state.loading = true;
        });
        //fulfilled
        builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
            if(state.weather && state.weather.length){
                const i = state.weather.findIndex(city => city.id === action.payload.id);
                if (i > -1) state.weather[i] = action.payload; // (2)
                else state.weather.push(action.payload);
            } else {
                state.weather = [];
                state.weather.push(action.payload);
            }
            state.loading = false;
            state.error = null;

        });
        builder.addCase(fetchWeatherForecastAction.fulfilled, (state, action) => {
            state.weather_forecast = action.payload;
            state.loading = false;
            state.error = null;

        });
        //rejected
        builder.addCase(fetchWeatherAction.rejected, (state, action) => {
            state.weather = [];
            state.loading = false;
            state.error = action ? action.city : null;
        });
        //rejected
        builder.addCase(fetchWeatherForecastAction.rejected, (state, action) => {
            state.weather = [];
            state.loading = false;
            state.error = action ? action.city : null;
        });
    },
});

export default weatherSlice.reducer;