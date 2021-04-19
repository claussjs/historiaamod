const { MessageEmbed, } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db");
exports.run = async(client, message, args) => {
    let yasaklar = ["aq", "allah", "Allah", "discord.gg", ".gg", "discord.gg/", "https://", "amk", "sik"]
    let sebep = args.join(' ');
    if (sebep && yasaklar.includes(sebep)) return message.reply('Geçerli bir AFK sebebi belirtmelisin!').then(x => x.delete({ timeout: 5000 }) && message.delete());
    if (sebep) db.set(`${message.author.id}.afk.sebep`, sebep);
    db.set(`${message.author.id}.afk.sure`, new Date());
    if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(console.log);
    message.reply(`Başarıyla AFK moduna girdin! Bir şey yazana kadar AFK sayılacaksın!`).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
};
exports.conf = {
    name: "afk",
    aliases: [],
    permLevel: 0
};