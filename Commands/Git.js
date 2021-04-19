const { MessageEmbed, MessageCollector } = require("discord.js");
const ayar = require("../settings.json");

exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let victim = message.guild.member(member)
    if (!victim) return message.react(ayar.no)
    if (!victim.voice.channel) return message.react(ayar.no)
    if (!message.member.voice.channel) return message.react(ayar.no)

    message.channel.send(embed.setDescription(`${victim} - ${message.author} Adlı kullanıcı ses kanalına gelmek istiyor kabul ediyor musun ?`)).then(async(msg) => {
        msg.react(ayar.yes)
        msg.react(ayar.no)

        const onayemoji = (reaction, user) => reaction.emoji.id === "827917065679011871" && user.id === victim.id;
        const redemoji = (reaction, user) => reaction.emoji.id === "816413589165441046" && user.id === victim.id;

        let onay = msg.createReactionCollector(onayemoji, { time: 30000, max: 1 })
        let red = msg.createReactionCollector(redemoji, { time: 30000, max: 1 })


        onay.on("collect", async() => {
            await msg.reactions.removeAll()
            message.member.voice.setChannel(victim.voice.channel.id)
            message.channel.send(embed.setDescription(`${victim} Adlı kullanıcı odaya gelmenizi onayladı.`)).then(m => m.delete({ timeout: 7000 }))
            msg.delete({ timeout: 7000 })
            message.delete()
        })
        red.on("collect", async() => {
            await msg.reactions.removeAll()
            message.channel.send(embed.setDescription(`${victim} Adlı kullanıcı odaya gitmenizi reddetti.`)).then(m => m.delete({ timeout: 7000 }))
            msg.delete({ timeout: 7000 })
            message.delete()
        })
    })
};
exports.conf = {
    name: "git",
    aliases: [],
    permLevel: 0
};