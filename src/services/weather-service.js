require('dotenv').config();
const axios = require('axios');
const api_token = process.env.API_TOKEN;




async function Get_Weather(city) {

const params = {
    access_key: api_token,
    query: city
}

    try {
        const response = await axios.get('http://api.weatherstack.com/current', {params});
        const apiResponse = response.data;
        return apiResponse.current.temperature;
    } catch (error) {
        console.log(error);
    }
}


module.exports = { Get_Weather };