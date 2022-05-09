import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from "../redux/slices/weatherSlices";

export default configureStore({
	reducer: weatherReducer,
})