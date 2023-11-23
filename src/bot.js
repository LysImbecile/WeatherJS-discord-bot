require("dotenv").config();
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");
const TOKEN = process.env.TOKEN

// Client Setup

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Creating our commands collection
client.commands = new Collection();


// on ready event

client.once(Events.ClientReady, client => {
    console.log(`[SUCESS] Logged in as ${client.user.username}`);
})

// Command Handler

const commandPath = path.join(__dirname, "commands");
const commandsFileNames = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));

// Commands info

let commands_quantity = 0
for (const file of commandsFileNames) {
    commands_quantity++
};
console.log(`[INFO] ${commands_quantity} commands found and loaded `);
console.table(commandsFileNames);

if (commands_quantity == 0) {
    console.warn("[WARNING] No command found")
}


// Commands loader

for (const file of commandsFileNames) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);


    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`Error loading ${file}`);
    }
}

// Event handler

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
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
    }

})

// bot login 

try {
    client.login(TOKEN);
}
catch(e) {
    console.log(`[ERROR] ${e}`)
}