import * as Discord from "discord.js";

// get values from config
// @ts-ignore
import * as config from "./config.json";

const TOKEN: string = config.TOKEN;

// create new discord client
const CLIENT: Discord.Client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS]
});

// login discord client
CLIENT.login(TOKEN).catch((err) => {
    console.log("Dicker error" + err);
});


CLIENT.on("ready", () => {
    console.log("Bot is ready");

    CLIENT.guilds.cache.forEach((c: Discord.Guild) => {
        console.log(c.id);
    })
});

