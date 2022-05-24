const fs = require("fs");

const allowedUser = ["477459599071641611","535868354469167104","171331815833993216"]
module.exports = {
    name:"server",
    async execute(interaction){
        let roleName = interaction.options.getString('name');
        let userId = interaction.options.getString('user');
        let allowedRoles = JSON.parse(fs.readFileSync("commands/roles/createdRoles.json").toString())
        if(allowedUser.includes(interaction.user.id)){
            interaction.guild.roles.fetch()
                .then(async roles => {
                    console.log(`There are ${roles.size} roles.`)

                    roles.forEach(role => {
                        if(role.name == roleName){
                            if(allowedRoles.includes(role.id)){

                                interaction.guild.members.fetch(userId)
                                    .then(user => {
                                        user.roles.add(role.id)
                                            .then( async test => {
                                                console.log(`${userId} joined ${roleName}`)
                                                await interaction.reply({
                                                    content: `Successfully joined ${roleName}`,
                                                    ephemeral: true
                                                })
                                            })
                                    })
                            }else{
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