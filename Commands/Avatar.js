const { MessageEmbed, } = require("discord.js");
const ayar = require("../settings.json");

exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    let avatar = user.avatarURL({ dynamic: true, format: 'png', size: 1024 })

    message.channel.send(avatar).then(m => m.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }))



};
exports.conf = {
    name: "avatar",
    aliases: ["av", "pp"],
    permLevel: 0
};