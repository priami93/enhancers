const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;


let cities = ['Rome', 'London', 'Paris', 'Madrid', 'Berlin'];
app.use(cors());


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/cities', (req, res) => {
    let results = [];

    async function geWeathertData() {
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
        for (let city of cities) {
            let response = await axios(`${baseURL}?q=` + city + '&appid=' + process.env.WEATHER_API_KEY)
                .catch(error => {
                    console.log('Show error notification!', error);
                    return error
                });
            results.push(response.data);
        }
    }

    async function geInfoData() {
        const baseURL = 'https://api.yelp.com/v3/businesses/search';
        for (let city of cities) {
            let response = await axios(baseURL + '?location=' + city, {
                headers: {
                    "Authorization": 'Bearer ' + process.env.YELP_API_KEY
                }
            })
                .catch(error => {
                    console.log('Show error notification!', error);
                    return error
                });

            objIndex = results.findIndex((obj => obj.name == city));
            results[objIndex].yelp_businesses = response.data.businesses;
        }
    }

    (async () => {
        try {
            await geWeathertData();
            await geInfoData();
            await res.json(results);
        } catch (error) {
            console.error(error);
        }
    })();



});



app.listen(port);
