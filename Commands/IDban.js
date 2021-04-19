const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.botCommands) && !message.member.roles.cache.has(ayar.banHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    let user = await client.users.fetch(args[0]);
    if (!args[0]) return message.react(ayar.no)
    let sebep = args.splice(1).join(" ") || "belirtilmemiş"

    //---------------------------------------------------------------------------------//
    message.guild.members.ban(user.id, { reason: sebep })
    message.channel.send(embed.setDescription(`<@!${user.id}> - (\`${user.id}\`) Adlı kullanıcı \`${sebep}\` sebebiyle yasaklandı.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    client.channels.cache.get(ayar.banLog).send(embed.setDescription(`
${user} Adlı kullanıcı yasaklandı.

 \`•\` Yetkili: ${message.author}
 \`•\` Kullanıcı: ${user}
 \`•\` Kullanıcı ID: (\`${user.id}\`)
 \`•\` Sebep: \`${sebep}\``))

};
exports.conf = {
    name: "ıdban",
    aliases: ["idban", "forceban"],
    permLevel: 0
};