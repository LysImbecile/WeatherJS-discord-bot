const { EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const { Get_Weather } = require( '../services/weather-service');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('weatherembed')
    .setDescription('gives you an embed with rich information!')
    .addStringOption(option =>
        option.setName('city')
        .setDescription('The city to get the weather from ')
        .setRequired(true)),

    async execute(interaction) {
        const { options } = interaction;
        const city = options.getString('city');
        const capitalized_city = city.charAt(0).toUpperCase() + city.slice(1);
        const apiResponse = await Get_Weather(city);
        const region = apiResponse.location.region;
        const weather_description = apiResponse.current.weather_descriptions;
        const weather = apiResponse.current.temperature;
        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/1163/1163657.png")
        .setImage("https://github.com/kitsunebishi/Wallpapers/blob/main/images/00239.jpg?raw=true")
        .setTitle(`Weather in ${capitalized_city}`)
        .setDescription(`${capitalized_city} [${region}] is currently ${weather}°C`)
        .addFields({ name: "Weather description", value: String(weather_description)})
        .setTimestamp()

    
        await interaction.reply({embeds: [embed]});
    }
}