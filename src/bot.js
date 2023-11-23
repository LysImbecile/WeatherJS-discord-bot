require("dotenv").config();
const {Client, Events, GatewayIntentBits, Collection} = require("discord.js");
const path = require("path");
const fs = require("fs");
const TOKEN = process.env.TOKEN

// Client Setup

const client = new Client({
    intents : [GatewayIntentBits.Guilds]
});


client.commands = new Collection();


// on ready event

client.once(Events.ClientReady, client => {
    console.log(`Logged in as ${client.user.displayName}`);
})

// Command Handler

const commandPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));


for (const file of commandsFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);


    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`Error loading ${file}`);
    }
}


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand) {
        return;
    }

    const { commandName } = interaction;

    try {
        await client.commands.get(commandName).execute(interaction);
    }
    catch (error) {
        console.log(error);
        await interaction.reply({content: "There was an error while executing this command!", ephemeral: true})
    }

} )


client.login(TOKEN);