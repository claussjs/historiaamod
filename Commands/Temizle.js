const { MessageEmbed } = require("discord.js");
const ayar = require ("../settings.json")
exports.run = async (client, message, args) => {
if(!message.member.roles.cache.has(ayar.botCommands) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
 
if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, \`.sil 1/100\``)).then(x => x.delete({timeout: 5000}));
  
  await message.delete().catch();
  
  message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(embed.setDescription(`**${msjlar.size}** Adet mesaj başarıyla temizlendi!`)).then(x => x.delete({timeout: 5000}))).catch()

};
exports.conf = {
  name: "temizle",
  aliases: ["sil"],
  permLevel: 0
};
