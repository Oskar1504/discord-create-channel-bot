const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('RoleManager')
        .addSubcommand(subcommand =>
            subcommand
                .setName("join")
                .setDescription("join role")
                .addStringOption(option => option.setName('name').setDescription('Enter a Rolename').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("forcejoin")
                .setDescription("add role to user")
                .addStringOption(option => option.setName('user').setDescription('Enter a User Id').setRequired(true))
                .addStringOption(option => option.setName('name').setDescription('Enter a Rolename').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("leave")
                .setDescription("Leave role")
                .addStringOption(option => option.setName('name').setDescription('Enter a Rolename').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("create")
                .setDescription("Create role")
                .addStringOption(option => option.setName('name').setDescription('Enter a Rolename').setRequired(true))
                .addStringOption(option => option.setName('color').setDescription('Enter a HexColorCode like #FF6699'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("edit")
                .setDescription("Set Mentionable to true hardcoded")
                .addStringOption(option => option.setName('name').setDescription('Enter a Rolename').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("list")
                .setDescription("list all roles")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("info")
                .setDescription("Send Bot Description")
        ),
    async execute(interaction) {
        let event = ""
        try{
            if(interaction.options.getSubcommandGroup()){
                event = require(`./${this.data.name}/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}`);
            }else{
                event = require(`./${this.data.name}/${interaction.options.getSubcommand()}`);
            }

        }catch (e){
            event = require(`./${this.data.name}/${interaction.options.getSubcommand()}`);
        }
        event.execute(interaction)
    },
};