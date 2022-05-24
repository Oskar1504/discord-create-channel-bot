const fs = require("fs");
module.exports = {
    name:"server",
    async execute(interaction){
        let roleName = interaction.options.getString('name');
        let allowedRoles = JSON.parse(fs.readFileSync("commands/roles/createdRoles.json").toString())
        interaction.guild.roles.fetch()
            .then(async roles => {
                console.log(`There are ${roles.size} roles.`)

                roles.forEach(role => {
                    if(role.name == roleName){
                        if(allowedRoles.includes(role.id)){

                            interaction.guild.members.fetch(interaction.user.id)
                                .then(user => {
                                    user.roles.add(role.id)
                                        .then( async test => {
                                            console.log(`${interaction.user.id}|${interaction.user.username} joined ${roleName}`)
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

    }
};