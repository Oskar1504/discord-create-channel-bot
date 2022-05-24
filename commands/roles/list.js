const fs = require("fs");
module.exports = {
    name:"server",
    async execute(interaction){
        let allowedRoles = JSON.parse(fs.readFileSync("commands/roles/createdRoles.json").toString())
        interaction.guild.roles.fetch()
            .then(async roles => {
                console.log(`There are ${roles.size} roles.`)
                let o = "Available roles are:\n"
                roles.forEach(role => {
                    console.log(`Name: ${role.name} id: ${role.id} color: ${role.color} Mentionable: ${role.mentionable}`)
                    console.log(role.mentionable)
                    if(role.name != "@everyone" && allowedRoles.includes(role.id)){
                        o += `Name: ${role.name}\n`
                    }
                })

                await interaction.reply({
                    content: o,
                    ephemeral: true
                })
            })
            .catch(async err => await interaction.reply({
                    content: err.toString(),
                    ephemeral: true
                })
            );
    }
};