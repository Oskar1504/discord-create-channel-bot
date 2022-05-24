const fs = require("fs");
const allowedUser = ["477459599071641611","535868354469167104","171331815833993216"]
module.exports = {
    name:"server",
    async execute(interaction){
        if(allowedUser.includes(interaction.user.id)) {
            let roleName = interaction.options.getString('name');
            let allowedRoles = JSON.parse(fs.readFileSync("commands/roles/createdRoles.json").toString())
            interaction.guild.roles.fetch()
                .then(async roles => {
                    console.log(`There are ${roles.size} roles.`)

                    roles.forEach(role => {
                        if (role.name == roleName) {
                            if (allowedRoles.includes(role.id)) {
                                role.edit({mentionable: true})
                                    .then(async test => {
                                        console.log(`Succesfully updated ${roleName}`)
                                        await interaction.reply({
                                            content: `Succesfully updated ${roleName}`,
                                            ephemeral: true
                                        })
                                    })
                            } else {
                                throw "Role not allowed to join"
                            }
                        }
                    })

                })
                .catch(async err => await interaction.reply({
                        content: err.toString(),
                        ephemeral: true
                    })
                );
        }else {
            await interaction.reply({
                content: "U not allowed",
                ephemeral: true
            })
        }

    }
};