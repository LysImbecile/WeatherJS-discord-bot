const { SlashCommandBuilder } = require("discord.js");
const { Get_Weather } = require( '../services/weather-service');





module.exports = {
    data : new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get the weather from a city!")
    .addStringOption(option => 
        option.setName('city')
        .setDescription('The city to get the weather from')
        .setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const city = options.getString('city');
        const weather = await Get_Weather(city);
        await interaction.reply(weather);
    }
}
