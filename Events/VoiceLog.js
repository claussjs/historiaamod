const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayar = require("../settings.json")
const client = global.client;

module.exports = (oldState, newState) => {
    if (ayar.sesLogKanali && newState.guild.channels.cache.get(ayar.sesLogKanali)) {
        let embed = new MessageEmbed().setColor('RANDOM').setTimestamp()
        let logKanali = newState.guild.channels.cache.get(ayar.sesLogKanali);

        if (!oldState.channelID && newState.channelID) return logKanali.send(embed.setDescription(`<@!${newState.id}> Adlı kullanıcı **#${newState.channel.name}** adlı ses kanalına katıldı.`)).catch();

        if (oldState.channelID && !newState.channelID) return logKanali.send(embed.setDescription(`<@!${newState.id}> Adlı kullanıcı **#${oldState.channel.name}** adlı ses kanalından ayrıldı.`)).catch();

        if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return logKanali.send(embed.setDescription(`<@!${newState.id}> Adlı kullanıcı **#${oldState.channel.name}** adlı ses kanaldan **#${newState.channel.name}** adlı kanala geçti.`)).catch();

        if (oldState.channelID && oldState.selfMute && !newState.selfMute) return logKanali.send(embed.setDescription(`<@!${newState.id}> Adlı kullanıcı **#${newState.channel.name}** adlı ses kanalında susturmasını kaldırdı.`)).catch();

        if (oldState.channelID && !oldState.selfMute && newState.selfMute) return logKanali.send(embed.setDescription(`<@!${newState.id}> Adlı kullanıcı **#${newState.channel.name}** adlı ses kanalında kendini susturdu.`)).catch();

        if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return logKanali.send(embed.setDescription(`<@!${newState.id}> Adlı kullanıcı **#${newState.channel.name}** adlı ses kanalında sağırlaştırmasını kaldırdı.`)).catch();

        if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return logKanali.send(embed.setDescription(`<@!${newState.id}> Adlı kullanıcı **#${newState.channel.name}** adlı ses kanalında kendini sağırlaştırdı.`)).catch();
    };
}

module.exports.configuration = {
    name: "voiceStateUpdate"
}