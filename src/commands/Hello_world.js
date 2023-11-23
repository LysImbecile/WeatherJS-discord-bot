const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Says hello to you!'),
  async execute (interaction) {
    await interaction.reply(`Hello from ${interaction.client.user.displayName}!`)
  }
}
