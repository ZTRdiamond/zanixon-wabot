require("./config")
const wawebjs = require("whatsapp-web.js")
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios');;
const os = require('os')
const moment = require("moment-timezone")
const { correct } = require("./lib/Correct")
const zndb = require('zanixon.db');
const rm = require("./lib/readmore.js");

module.exports = async (zanixon, m, commands) => {
    try {
        // import some important const
        const { body, from, hasMedia: isMedia, type } = m 
        const zn = require('zanixon.db');
        const { getRandom, fetchBuffer, fetchUrl, WAVersion, clockString, isUrl, sleep, jsonformat, parseMention, isNumber } = require("./lib/Function");
        const utils = require('./lib/utils.js');
        const readmore = rm.readmore(); 
        
        // user message reader
        const args = body.trim().split(/[\s\n]+/).slice(1);
        const text = args.join(" ")
        const quoted = m.hasQuotedMsg ? await m.getQuotedMessage() : m
        const mime = (quoted._data || quoted).mimetype || ""
        const listMentions = quoted.mentionedIds.map((mention) => mention._serialized) || m.mentionedIds.map((mention) => mention._serialized)
        const metadata = await m.getChat()
        
        // bot user
        const sender = m.author || m.id.remote
        const remote = m.id.remote
        const isRegistered = false;
        const isPremium = zn.get("premium", sender, null, true) || false; 
        const isBanned = zn.get("banned", sender, null, true) || zn.set("banned", false, sender, null, true);
        const limit = zn.get("limit", sender, "default", false);
        
        // bot config
        let isPublic = zn.get("public", null, "config", true);
        var prefix = [zn.get("prefix", m.id.remote, null, true) || zn.set("prefix", ".", sender, null, true)];
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const cmd = commands.get(command) || Array.from(commands.values()).find((v) => v.alias.find((x) => x.toLowerCase() == command)) || "";
        let isCmd = cmd.nonPrefix ? cmd.nonPrefix : body.startsWith(prefix);
        const detraw = cmd.details || { desc: "none", usage: "%prefix%command" };
        let uraw = detraw.usage;
        let usage = uraw.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text);
        let desc = detraw.desc;
        let details = { desc: desc, usage: usage };
        console.log("Details: \n\n", cmd + "\n\n", details);
        
        // checker
        const isOwner = [zanixon.info.wid._serialized, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(sender)
        const isMsgMentioned = m.mentionedIds.length > 0
        const isQtdMentioned = quoted.mentionedIds.length > 0
        const isGroup = from.endsWith("@g.us")
        const isQuoted = m.hasQuotedMsg
        const participants = isGroup ? metadata.groupMetadata.participants : []
        const groupAdmins = isGroup ? participants.filter(v => v.isAdmin && !v.isSuperAdmin).map(v => v.id._serialized) : []
        const isBotAdmin = isGroup ? groupAdmins.includes(zanixon.info.wid._serialized) : false
        const isAdmin = isGroup ? groupAdmins.includes(sender) : false 
        const isNsfw = zn.get("isNsfw", m.id.remote, null, false);
        const groupName = isGroup ? metadata.groupMetadata.name : ""

        // bot mode: public || self
        if(isOwner === false && isPublic === false) return 
        
        // check user if isBanned?
        if(isOwner === false && isBanned === true) return 
        
        // msg or command logs
        if (isCmd === true && m) {
            console.log(chalk.yellow('[ PESAN ]'), chalk.yellow("Terkirim pukul " + moment.unix(m._data.t).tz("Asia/Jakarta").format("HH:mm:ss") + " WIB" + "\n"), chalk.blue(body || type) + "\n" + chalk.yellow("➭ Dari"), chalk.blue(m._data.notifyName), chalk.yellow(sender) + "\n" + chalk.yellow("➭ Di"), chalk.blue(isGroup ? groupName : m._data.notifyName, from) + "\n" + chalk.green("・------------------------------------------"))  
        }
        
        // check if user isPremium
        if(isPremium === true) {
            let now = Date.now();
            let premiumExpiredDate = zn.get("premiumTimestamp", sender, null, true);
            if(now > premiumExpiredDate) {
                zn.set("premium", false, sender, null, true);
                zn.delete("premiumDuration", sender, null, true);
                zn.set("premiumTimestamp", 0, sender, null, true);
                m.reply(`${zn.emoji("alert")}︱Masa premium kamu telah habis, info selengkapnya cek di dm kamu.`);
                zanixon.sendMessage(sender, `Halo *${m._data.notifyName}*, Masa berlaku premium kamu telah habis hari ini, Jika kamu ingin menambah durasi *Premium* silahkan pergi ke halaman *Trakteer* kami dibawah ini.

*Trakteer:* https://trakteer.id/zanixongroup/tip
*Note:* pastikan kamu hubungi admin dan kirimkan bukti transaksi beserta id transaksi untuk validasi, terima kasih.`);
            } else {
                let timeUpdt = zn.set("premiumDuration", utils.parseUnix(zn.get("premiumTimestamp", sender, null, true)), sender, null, true);
                //console.log(`Premium "${sender}" time has been updated to "${timeUpdt}"`);
            }
        }

        if(isCmd == false && cmd.nonPrefix == false) {
            return;
        }
        //if (options.autoRead) (zanixon.type == "legacy") ? await zanixon.chatRead(m.key, 1) : await zanixon.sendReadReceipt(from, sender, [m.id])
        //if (global.options.mute === true && isOwner === false) return 
        
        if (isCmd && !cmd) {
            //m.reply(teks)
            return;
        } else if (!isCmd && !cmd) return
        
        // cooldown system to avoid spam
        let cdData = zn.getCooldown(sender, "{sec} detik", true);
        if(isOwner === false && isPremium === false && cdData !== undefined && cdData.status === true) {
            m.reply(zn.emoji("wait") + `︱Tunggu *${cdData.time}* untuk memanggil perintah bot lagi!`);
            return;
        } else {
            let cdDuration = zn.get("cooldown", null, null, true);
            let cdsData = zn.setCooldown(sender, cdDuration, true);
            console.log(`[System] cooldown 10 second was added to ${sender.replace("@c.us", "")}`);
        }
        
        // check isMedia?
        if (cmd.isMedia && !isMedia) {
            return global.mess("media", m)
        }
        
        // check isRegistered?
        if (cmd.isRegistered && isRegistered == false) {
            m.reply(`${zn.emoji("alert")}│Kamu belum terdaftar di dalam database bot, Silahkan daftar dengan *.register* untuk mendaftar.`)
            return
        }
        
        // check isOwner?
        if (cmd.isOwner && !isOwner) {
            return global.mess("owner", m)
        }
        
        // check isGroup?
        if (cmd.isGroup && !isGroup) {
            return global.mess("group", m)
        }
        
        // check isPrivate?
        if (cmd.isPrivate && isGroup) {
            return global.mess("private", m)
        }
        
        // check isPremium? 
        if(cmd.isPremium && !isPremium) {
            return global.mess("premium", m);
        }
        
        // check isBotAdmin?
        if (cmd.isBotAdmin && !isBotAdmin) {
            return global.mess("botAdmin", m)
        }
        
        // check is group admin?
        if (cmd.isAdmin && !isAdmin) {
            return global.mess("admin", m)
        }
        
        // check is from bot?
        if (cmd.isBot && m.id.fromMe) {
            return global.mess("bot", m)
        }
        
        // check isPremium?
        if (cmd.isPremium && m.id.fromMe) {
            return global.mess("premium", m)
        }
        
        // check is command disable?
        if (cmd.disable && cmd) {
            return global.mess("dead", m)
        }
        
        // command info options
        if (desc && text.endsWith("-desc")) return m.reply(desc)
        if (usage && text.endsWith("-use")) {
            return m.reply(usage)
        }
        if(cmd.details && text.endsWith("-info")) {
            let info = `*Command Info:*
➭ Name: *${cmd.name}*
➭ Aliases: *${cmd.alias}*
➭ Only Premium: *${cmd.isPremium ? "🟢" : "🔴"}*
➭ Only Owner: *${cmd.isOwner ? "🟢" : "🔴"}*
➭ Only Group: *${cmd.isGroup ? "🟢" : "🔴"}*
➭ Using Limit: *${cmd.isLimit ? "🟢" : "🔴"}*
➭ Only Group Admin: *${cmd.isAdmin ? "🟢" : "🔴"}*
➭ Description: *${desc}*

➭ Usage: *${usage}*
`;
            return m.reply(info);
        } 
        
        // check isQuery?
        if (cmd.isQuery && !text) {
            return m.reply(usage)
        }
        
        // check isNsfw? 
        if(cmd.isNsfw && isNsfw == false) {
            return global.mess("nsfw", m);
        }
        
        // check isLimit?
        if (cmd.isLimit == true) {
            if(limit === 0) {
                return global.mess("limit", m);
            }
            zn.set("limit", Math.floor(parseInt(limit) - 1), sender, null, "default", false);
            m.reply(zn.limit("alert") + `︱Limit terpakai *1* dari *${zn.abbreviate(limit, "0.00a")}*`);
        }


        try {
            let cmdOptions = {
                name: "ZTRdiamond",
                limit,
                isPublic,
                getRandom,
                fetchBuffer, 
                fetchUrl, 
                WAVersion, 
                clockString, 
                isUrl, 
                sleep, 
                jsonformat, 
                parseMention, 
                isNumber,
                body,
                from, 
                zn,
                details,
                desc,
                usage,
                utils,
                readmore,
                cmd,
                axios,
                isNsfw,
                isRegistered,
                isPremium,
                isMedia,
                isQuoted,
                listMentions,
                isMsgMentioned,
                isQtdMentioned,
                type,
                sender,
                remote,
                prefix,
                command,
                commands,
                args,
                isOwner,
                text,
                quoted,
                mime,
                isGroup,
                metadata,
                groupName,
                participants,
                groupAdmins,
                isBotAdmin,
                isAdmin,
                toUpper: function(query) {
                    return query.replace(/^\w/, c => c.toUpperCase())
                },
                Function: require("./lib"),
            }
            cmd.code(zanixon, m, cmdOptions)
        } catch(e) {
            console.error(e)
        }

    } catch (e) {
        console.log(util.format(e))
        zanixon.sendMessage('6285697103902@c.us', `*Error at ${m.author || m.id.remote} request:* \n\n` + util.format(e))
    }
}

global.reloadFile(__filename)
