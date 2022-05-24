const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('ChannelManager')
        .addSubcommand(subcommand =>
            subcommand
                .setName("create")
                .setDescription("create channel")
                .addStringOption(option => option.setName('channelname').setDescription('Enter a Channelname').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("deleteall")
                .setDescription("deleta all temp channel")
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