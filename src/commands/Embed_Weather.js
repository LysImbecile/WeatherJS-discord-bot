const { EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const { Get_Weather } = require( '../services/weather-service');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('weatherembed')
    .setDescription('gives you an embed with rich information!')
    .addStringOption(option =>
        option.setName('city')
        .setDescription('The city to get the weather from')
        .setRequired(true)),

    async execute(interaction) {
        const { options } = interaction;
        const city = options.getString('city');
        const capitalized_city = city.charAt(0).toUpperCase() + city.slice(1);
        const apiResponse = await Get_Weather(city);
        const weather = apiResponse.current.temperature;
        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`Weather in ${city}`)
        .setDescription(`${capitalized_city} is currently ${weather}°C`)
        .setTimestamp()

    
        await interaction.reply({embeds: [embed]});
    }
}