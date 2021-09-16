import DiscordJS from 'discord.js'

export default {
    category: 'howgay',
    description: 'a howgay command',

    async run (client, message, args) {
        let member = message.mentions.user.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new DiscordJS.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + rng + "% Gay 🌈")
        .setColor('GREEN')

        message.channel.send(howgayembed);
    }
}