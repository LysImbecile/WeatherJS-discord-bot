const { SlashCommandBuilder, EmbedBuilder }  = require("discord.js");


module.exports = {
    data : new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get an embed with information about this bot!'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setColor("DarkPurple")
        .setTitle("Bot documentation")
        .setDescription("There are some commands that you can use with this bot!")
        .setFields(
            {name: "/weatherembed", value: String("Get the weather of a city in a fancy embed")},
            {name: "/help", value: String("Get this embed")}
        )
        .setTimestamp()

        await interaction.reply({embeds: [embed]});
    }
    
}