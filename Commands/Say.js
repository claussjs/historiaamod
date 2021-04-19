const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json")
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    if (!message.member.roles.cache.has(ayar.botCommands) && !message.member.hasPermission(8)) return message.react(ayar.no)

    let toplam = message.guild.memberCount;
    let ses = message.guild.members.cache.filter(x => x.voice.channel).size
    let taglı = message.guild.members.cache.filter(x => x.user.username.includes(ayar.tag)).size
    let aktif = message.guild.members.cache.filter(x => x.presence.status !== "offline").size
    let boost = message.guild.premiumSubscriptionCount
    let boostlevel = message.guild.premiumTier

    message.channel.send(embed.setDescription(`
\`•\` Seste toplam \`${ses}\` kullanıcı var.
\`•\` Toplam \`${taglı}\` kişi tagımıza sahip.
\`•\` Sunucumuzda toplam \`${toplam}\` üye var.
\`•\` Sunucumuza toplam \`${boost}\` takviye yapılmış, \`${boostlevel}\`. seviye.
\`•\` Sunucumuzda toplam \`${aktif}\` çevrimiçi üye var.
`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
};
exports.conf = {
    name: "say",
    aliases: [],
    permLevel: 0
};