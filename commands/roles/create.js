const fs = require("fs");
const allowedUser = ["477459599071641611","535868354469167104","171331815833993216"]
module.exports = {
    name:"server",
    async execute(interaction){
        if(allowedUser.includes(interaction.user.id) || true){
            let name = interaction.options.getString('name').replaceAll(" ","");
            let color = interaction.options.getString('color');
            let reg=/^#([0-9a-f]{3}){1,2}$/i;

            if(reg.test(color)){
                color = hexStringToColor(color)
            }else{
                color = Math.floor(Math.random()*16777215)
            }

            interaction.guild.roles.create({
                name: name,
                color: color,
                reason: 'Created with Scrop-RoleManger by Oskar1504',
                mentionable:true
            })
            .then(async role => {
                let fileContent = JSON.parse(fs.readFileSync("commands/roles/createdRoles.json").toString())
                fileContent.push(role.id)
                fs.writeFileSync(
                    "commands/roles/createdRoles.json",
                    JSON.stringify(fileContent)
                )
                console.log(`Name: ${role.name} id: ${role.id} color: ${role.color} `)
                await interaction.reply({
                    content: `Name: ${role.name} id: ${role.id} color: ${role.color} `,
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
