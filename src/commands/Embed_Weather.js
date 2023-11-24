const { EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const { Get_Weather } = require( '../services/weather-service');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('weatherembed')
    .setDescription('gives you an embed with rich information!')
    .addStringOption(option =>
        option.setName('city')
        .setDescription('The city to get the weather from ')
        .setRequired(true))
    .addStringOption(option => 
        option.setName('medition')
        .setDescription('The medition system to use')
        .setRequired(false)),

    async execute(interaction) {
        var medition_type = '°C'
        const { options } = interaction;
        const city = options.getString('city');
        const capitalized_city = city.charAt(0).toUpperCase() + city.slice(1);
        const medition = options.getString('medition') || 'C';
        const apiResponse = await Get_Weather(city, medition);        
        const country = apiResponse.location.country;
        const region = apiResponse.location.region;
        const weather_description = apiResponse.current.weather_descriptions;
        const weather_icon = apiResponse.current.weather_icons;
        const weather = apiResponse.current.temperature;
        
        if (medition === 'F') {
            medition_type = '°F';
        }
        const embed = new EmbedBuilder()
            .setColor("Purple")
            .setThumbnail(String(weather_icon))
            .setImage("https://github.com/kitsunebishi/Wallpapers/blob/main/images/00239.jpg?raw=true")
            .setTitle(`Weather in ${capitalized_city}`)
            .setDescription(` ${country} - [${region}] ${capitalized_city} is currently ${weather} ${medition_type}`)
            .addFields({ name: "Weather description", value: String(weather_description)})
            .setTimestamp()

        await interaction.reply({embeds: [embed]});
    }
}