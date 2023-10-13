const { MessageMedia } = require("whatsapp-web.js")
const moment = require('moment-timezone');

module.exports = {
    name: "menu",
    alias: ["help","?","list"],
    desc: "List all command",
    type: "main",
    code: async(zanixon, m, { commands, args, prefix, text, toUpper, name, utils, readmore, zn, isPublic, sender, limit }) => {
        let thumb = zn.get("menuImage", null, "config", true);
        if (args[0]) {
            let data = []
            let name = args[0].toLowerCase()
            let cmd = commands.get(name) || Array.from(commands.values()).find((v) => v.alias.includes(name))
            if (!cmd || cmd.disable == true) {
                return m.reply("No Command Found")
            } else {
                let info = `*Command Info:*
➭ Name: *${cmd.name}*
➭ Aliases: *${cmd.alias}*
➭ Only Premium: *${cmd.isPremium ? "🟢" : "🔴"}*
➭ Only Owner: *${cmd.isOwner ? "🟢" : "🔴"}*
➭ Only Group: *${cmd.isGroup ? "🟢" : "🔴"}*
➭ Using Limit: *${cmd.isLimit ? "🟢" : "🔴"}*
➭ Only Group Admin: *${cmd.isAdmin ? "🟢" : "🔴"}*
➭ Description: *${cmd.details.desc}*

➭ Usage: *${cmd.details.usage.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}*`;
                return m.reply(info)
            }
        } else {
            let teks = ""

            for (let type of commands.type.sort()) {
                if(type && commands.list[type] && Array.isArray(commands.list[type])) {
                   let filt = commands.list[type].filter(v => v.disable !== true).map((cmd) => {
                       let prem = cmd.isPremium ? "🄿" : "";
                       let lim = cmd.isLimit ? "🄻" : "";
                       return `┃ ❧ ${prefix + cmd.name} ${prem + lim}` 
                   });
                   let list = filt.sort();
                   teks += `\n╭╼━「 *${toUpper(type)}* 」\n`
                   teks += `${list.join("\n")}\n`
                   teks += `╰╼━━━━━━━━━━━━╾・\n`
                }
            }
            //let image = zn.get("menuImage", null, "config", true);
            //let media = await MessageMedia.fromUrl(image, { unsafeMime: true })
            zanixon.sendMessage(m.id.remote, `*#SAVEPALESTINE🇵🇸 - #PRAYFORPALESTINE🇵🇸*
Halo *${m._data.notifyName}*!

Sponsor bot: *J*
Grup sponsor: https://s.id/1Ugz8

╭╼━「 *ZanixonMD* 」
┃ ❧ Owner: *ZTRdiamond*
┃ ❧ Mode: *${isPublic ? "Public" : "Self"}*
┃ ❧ Jam: *${moment().tz('Asia/Jakarta').format('HH:mm:ss')} WIB*
┃ ❧ Tanggal: *${moment().tz('Asia/Jakarta').format('DD MMM YY')}*
┃ ❧ Uptime: *${utils.uptime().short}*
┃ ❧ Cpu: *${utils.cpu()}%*
┃ ❧ Ram: *${utils.formatBytes(process.memoryUsage().rss)}*
┃ ❧ Command: *${zn.get("commandCount")} total*
┃ ❧ Prefix: *${zn.get("prefix", sender, null, true)}*
┃ ❧ Opsi: -use, -desc, dan -info.
╰╼━━━━━━━━━━━━╾・

╭╼━「 *User Info* 」
┃ ❧ Name: *${m._data.notifyName}*
┃ ❧ Premium: *${zn.get("premium", sender, null, true) ? "🟢" : "🔴"}*
┃ ❧ Limit: *${zn.abbreviate(limit, "0.00a")}*
┃ ❧ Prefix: *${zn.get("prefix", sender, null, true)}*
╰╼━━━━━━━━━━━━╾・\n` + teks + `
\`\`\`
Powered by Zanixon Group™
\`\`\``, { quotedMessageId: m.id._serialized, extra: {
ctwaContext: {
linkPreview: true,
title: `ZanixonMD | Whatsapp Bot`,
thumbnailUrl: thumb,
description: '© Zanixon Group All Right Reserved',
sourceUrl: 'https://trakteer.id/zanixongroup' //grup short: https://s.id/1UIlf
             }
       }
  });
            console.log(`The bot commands menu has been successfully sent to ${m.id.remote} chat`);
        }
    }
}
