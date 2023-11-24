require('dotenv').config();
const axios = require('axios');
const api_token = process.env.API_TOKEN;

async function Get_Weather(city, medition_type) {
    const params = {
        access_key: api_token,
        query: city,
        units: medition_type === 'F' ? 'f' : 'm' // Use 'f' for Fahrenheit, 'm' for Celsius
    }

    try {
        const response = await axios.get('http://api.weatherstack.com/current', {params});
        const apiResponse = response.data;
        return apiResponse;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { Get_Weather };