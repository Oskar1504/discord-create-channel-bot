const fs = require("fs");
const allowedUser = ["477459599071641611","535868354469167104","171331815833993216"]
module.exports = {
    name:"server",
    async execute(interaction){
        if(allowedUser.includes(interaction.user.id)){
            await interaction.guild.channels.fetch()
            .then(async channels => {
                //channels and channel.members is an [MAP] -> using size to get length
                let deletedChannels = 0
                
                channels.filter(channel => (channel.name.includes("-[temp]") && channel.members.size == 0))
                    .forEach(channel => {
                        deletedChannels ++
                        channel.delete()
                    })
                    
                await interaction.reply({
                    content: `Found ${deletedChannels} empty [temp] channel and deleted them`,
                    ephemeral: true
                })
            })
        }else{
            await interaction.reply({ content: 'Not authorized!', ephemeral: true })
        }
    }
};


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
