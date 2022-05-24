# discord-create-channel-bot

## Setup
- grundlegende technische frameworks
    - node.js
    - discord.js


## Anforderungen
- mann kann einen / command eingeben mit parameter welcher einen sprachkanal erstellt
- wenn nach 5 minuten keiner mehr im channel ist wird der channel gelöscht

## Commands
- /channel create
    - Parameter
        - Channelname  -  required
        - Max channel user  -  not required

## technische umsetzung
- discord js doku
    - https://discord.js.org/#/docs/discord.js/stable/general/welcome  
- channel creation
    - https://discord.js.org/#/docs/discord.js/stable/class/GuildChannelManager?scrollTo=create
- channel leave event
    - https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-voiceStateUpdate
    - direktes code bsp
        - https://stackoverflow.com/a/64932078   
