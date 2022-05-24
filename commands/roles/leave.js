module.exports = {
    name:"server",
    async execute(interaction){
        let roleName = interaction.options.getString('name');

        //query all roles to check if role exist
        interaction.guild.roles.fetch()
            .then(async roles => {
                roles.forEach(role => {
                    if(role.name == roleName){
                        //fetch guildMember entity to modify roles
                        // using author as user filter
                        interaction.guild.members.fetch(interaction.user.id)
                            .then(guildMember => {
                                // finally remove  role
                                guildMember.roles.remove(role.id)
                                    .then( async test => {
                                        console.log(`${interaction.user.id}|${interaction.user.username} joined ${roleName}`)
                                        await interaction.reply({
                                            content: `Successfully leaved ${roleName}`,
                                            ephemeral: true
                                        })
                                    })
                            })
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