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
        const weather = await Get_Weather(city);
        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`Weather in ${city}`)
        .setDescription(`${city} is currently ${weather}°C`)
        .setTimestamp()

    
        await interaction.reply({embeds: [embed]});
    }
}