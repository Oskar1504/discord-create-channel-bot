const fs = require("fs");
// laurus server
const REQUIRED_ROLE = "778020389065457665"
const PARENT_CATEGORIE = "802196272932061235"
// oskars server
// const REQUIRED_ROLE = "718065631106302092"
// const PARENT_CATEGORIE = "623845562902642688"
module.exports = {
    name:"server",
    async execute(interaction){
            await interaction.guild.roles.fetch(REQUIRED_ROLE)
            .then(async role => {
                let memberIds = role.members.map(user => user.id)
                if(memberIds.includes(interaction.user.id)){
                    try{
                        // TODO channelName verification
                        let channelName = interaction.options.getString('channelname');
                        verifyChannelName(channelName)
                        // TODO more channel options
                        // let maxUser = interaction.options.getInteger('maxuser');
                        
                        channelName = `${channelName}-by-${interaction.user.username}-[temp]`

                        interaction.guild.channels.create(channelName, {
                            type: 'GUILD_VOICE',
                            reason: 'Created with Scrop-ChannelManager by Oskar1504',
                            parent: PARENT_CATEGORIE
                        })
                        .then(async channel => {
                            console.log(`created ChannelName: ${channel.name} id: ${channel.id} `)
                            
                            await interaction.reply({
                                content: `created ChannelName: ${channel.name} id: ${channel.id} `,
                                ephemeral: true
                            })
                        })
                        .catch(async err => {
                            console.log(err)
                            await interaction.reply({
                                content: `Error: ${err.toString()} `,
                                ephemeral: true
                            })
                        })
                    }catch(e){
                        await interaction.reply({
                            content: `Error ${e.toString()}`,
                            ephemeral: true
                        })
                    }
                    }else{
                        await interaction.reply({ content: 'Not authorized!', ephemeral: true })
                    }
                
            })
    }
};


function verifyChannelName(name){
    if(name.length >= 20){
        throw "Name to long. Max 19 chars"
    }
    if(!/^[a-zA-Z]+$/.test(name)){
        throw "only A-z allowed"
    }
}

/**
 * Converts RGB Hex string to a BGR base10 color.
 *
 * @method hexStringToColor
 * @param {String} hex A hex code as string.
 * @returns {Integer} The integer in base10 format.
 */
function hexStringToColor(hex) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return (r | g << 8 | b << 16);
}
