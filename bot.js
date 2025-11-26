require('dotenv').config(); 
const Discord = require("discord.js"); 
const { GatewayIntentBits } = require("discord.js");
const fs = require('fs');
const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
}); 

let items = [];
try {
    items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
} catch (err) {
    console.error('Failed to load items.json:', err);
}

client.on("ready", () => { 
    console.log(`Logged in as ${client.user.tag}!`) 
}) 
client.on("messageCreate", msg => { 
    if (msg.content.startsWith("*")) {
        const command = msg.content.slice(1).toLowerCase();
        if (command === "help") {
            msg.reply("This is the help message!");
            return;
        } else if (command === "ping") {
            msg.reply("pong");
            return;
        }
        // Try to match as item id or name
        const found = items.find(item => item.id.toLowerCase() === command || item.name.toLowerCase() === command);
        if (found) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`${found.name} (Gallary ID: ${found.id})`)
                .setColor(0x00AE86)
                .setDescription((found.description || "No description available.") + "\n\u200B")
                .addFields(
                    { name: 'Rarity', value: found.rarity || 'Unknown', inline: true },
                    ...(found.damage ? [
                        { name: 'Damage', value: `Body: ${found.damage.body}\nHead: ${found.damage.head}`, inline: true }
                    ] : []),
                    ...(found.FireRate ? [
                        { name: 'Fire Rate', value: found.FireRate.toString(), inline: true }
                    ] : []),
                    ...(found.capacity !== undefined ? [
                        { name: ' ', value: ' ', inline: false },
                        { name: 'Capacity', value: found.capacity.toString(), inline: false }
                    ] : []),
                    ...(found.mobility !== undefined ? [
                        { name: ' ', value: ' ', inline: false },
                        { name: 'Mobility', value: found.mobility.toString(), inline: false }
                    ] : []),
                    ...(found.attributes ? [
                        { name: ' ', value: ' ', inline: false },
                        { 
                            name: 'Attributes', 
                            value: Object.entries(found.attributes)
                                .filter(([k, v]) => v)
                                .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
                                .join(', '), 
                            inline: false 
                        }
                    ] : []),
                    ...(found.delay !== undefined ? [
                        { name: ' ', value: ' ', inline: false },
                        { 
                            name: 'Delay', 
                            value: typeof found.delay === 'object' 
                                ? Object.entries(found.delay)
                                    .filter(([k, v]) => v)
                                    .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
                                    .join(', ') 
                                : found.delay.toString(), 
                            inline: false 
                        }
                    ] : [])
                );
            msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            return;
        }
        msg.reply("Unknown command or item. Type !help for a list of commands.");
        return;
    }
}) 
client.login(process.env.DISCORD_TOKEN);