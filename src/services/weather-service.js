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
        return apiResponse;
        
    } catch (error) {
        console.log(error);
    }
}

Get_Weather('New York');

module.exports = { Get_Weather };