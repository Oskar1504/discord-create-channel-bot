const fs = require("fs");
module.exports = {
    name:"server",
    async execute(interaction){

        await interaction.reply({
            content: fs.readFileSync("commands/channel/infoText.txt").toString()
        })
    }
};