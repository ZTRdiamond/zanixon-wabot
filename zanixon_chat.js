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
        // import some modules 
        const wwebjs = require("whatsapp-web.js");
        const { body, from, hasMedia: isMedia, type } = m;
        const { MessageMedia } = require("whatsapp-web.js");
        const zn = require('zanixon.db');
        const { getRandom, fetchBuffer, fetchUrl, WAVersion, clockString, isUrl, sleep, jsonformat, parseMention, isNumber } = require("./lib/Function");
        const utils = require('./lib/utils.js');
        const readmore = rm.readmore(); 
        const downloader = require("./lib/downloader.js");
        const { default: bard } = await import("./lib/bard.mjs");
        const { default: pins } = await import("./lib/pins.mjs");
        
        // user message reader
        const args = body.trim().split(/[\s\n]+/).slice(1);
        const text = args.join(" ")
        const quoted = m.hasQuotedMsg ? await m.getQuotedMessage() : m 
        const q = m.hasQuotedMsg ? await m.getQuotedMessage() : m
        const mime = (quoted._data || quoted).mimetype || ""
        const listMentions = quoted.mentionedIds.map((mention) => mention._serialized) || m.mentionedIds.map((mention) => mention._serialized)
        const metadata = await m.getChat()
        
        // bot user
        const sender = m.author || m.id.remote;
        const senderName = m._data.notifyName;
        const remote = m.id.remote
        const isRegistered = false;
        const isPremium = zn.get("premium", sender, null, true) || false; 
        const isBanned = zn.get("banned", sender, null, true) || zn.set("banned", false, sender, null, true);
        const limit = zn.get("limit", sender, "default", false);
        
        // bot config
        let isPublic = zn.get("public", null, "config", true);
        var prefix = [zn.get("prefix", m.id.remote, null, true) || zn.set("prefix", ".", sender, null, true)];
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const cmd = commands.get(command) || Array.from(commands.values()).find((v) => v.aliases.find((x) => x.toLowerCase() == command)) || {};
        let isCmd = cmd.nonPrefix ? cmd.nonPrefix : body.startsWith(prefix);
        const detraw = cmd.details || { desc: "none", usage: "%prefix%command" };
        let usage = `${detraw.usage}`.replace(/%prefix/gi, prefix).replace(/%command/gi, command).replace(/%text/gi, text);
        let desc = detraw.desc;
        let details = { desc: desc, usage: usage };
        //console.log("Details: \n\n", command + "\n\n", details);
        
        // checker
        const isOwner = [zanixon.info.wid._serialized, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(sender)
        const isMsgMentioned = m.mentionedIds.length > 0
        const isQtdMentioned = quoted.mentionedIds.length > 0
        const isGroup = from.endsWith("@g.us")
        const isQuoted = m.hasQuotedMsg
        const participants = isGroup ? metadata.groupMetadata.participants : []
        const groupAdmins = isGroup ? participants.filter(v => v.isAdmin && !v.isSuperAdmin).map(v => v.id._serialized) : [];
        const superAdmins = isGroup ? participants.filter(v => v.isSuperAdmin).map(v => v.id._serialized) : [];
        const isBotAdmin = isGroup ? groupAdmins.includes(zanixon.info.wid._serialized) : false
        const isAdmin = isGroup ? groupAdmins.includes(sender) : false;
        const isSuperAdmin = isGroup ? superAdmins.includes(sender) : false;
        const isNsfw = zn.get("isNsfw", m.id.remote, null, false);
        const groupName = isGroup ? metadata.groupMetadata.name : "";

        // bot mode: public || self
        if(isOwner === false && isPublic === false) return 
        // check user if isBanned?
        if(isOwner === false && isBanned === true) return
        // msg or command logs
        if (isCmd === true && m) {
            console.log(chalk.yellow('[ PESAN ]'), chalk.yellow("Terkirim pukul " + moment.unix(m._data.t).tz("Asia/Jakarta").format("HH:mm:ss") + " WIB | " + moment.unix(m._data.t).tz("Asia/Jakarta").format("DD/MM/YYYY") + "\n"), chalk.blue(body || type) + "\n" + chalk.yellow("➭ Dari"), chalk.blue(m._data.notifyName), chalk.yellow(sender) + "\n" + chalk.yellow("➭ Di"), chalk.blue(isGroup ? groupName : m._data.notifyName, from) + "\n" + chalk.green("・------------------------------------------"))  
        }
        if(cmd.name == undefined) return;
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
            return;
        } else if (!isCmd && !cmd) return
        // cooldown system to avoid spam
        let cdData = zn.getCooldown(`${cmd.name}_${sender}`, "Hai", true);
        if(isOwner === false && isPremium === false && cdData !== undefined && cdData.status === true) {
            m.reply(zn.emoji(cmd.cooldown.emoji) + `${cdData.time}`);
            return;
        } else {
            let cdDuration = cmd.cooldown.duration;
            let cdsData = zn.setCooldown(`${cmd.name}_${sender}`, cdDuration, true);
            console.log(`[System] cooldown ${cmd.cooldown.duration} second was added to command ${cmd.name} on user ${sender.replace("@c.us", "")}`);
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
        if (cmd.disable.active && cmd) {
            m.reply(zn.emoji(cmd.disable.emoji) + cmd.disable.msg);
            return;
        }
        
        // command info options
        if (desc && text.endsWith("-desc")) return m.reply(desc)
        if (usage && text.endsWith("-use")) {
            return m.reply(usage)
        }
        if(cmd.details && text.endsWith("-info")) {
            let info = `*Command Info:*
➭ Name: *${cmd.name}*
➭ Aliases: *${cmd.aliases}*
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
        
        let totalRequest = zn.get("totalRequest", sender, null, false);
        zn.set("totalRequest", totalRequest + 1, sender, null, true);
        try {
            let cmdOptions = {
                name: global.botname,
                // modules
                zn,
                bard,
                downloader,
                pins,
                readmore,
                MessageMedia,
                body,
                type,
                from,
                utils,
                axios,
                os,
                moment,
                fs,
                wwebjs,
                // user 
                limit,
                totalRequest,
                isBanned,
                isRegistered,
                isPremium,
                isAdmin,
                isSuperAdmin,
                isOwner,
                isBotAdmin,
                sender,
                remote,
                senderName,
                // func 
                getRandom,
                fetchBuffer,
                fetchUrl,
                WAVersion,
                isUrl,
                clockString,
                sleep,
                jsonformat,
                parseMention,
                isNumber,
                // msg system 
                m,
                q,
                quoted,
                args,
                text,
                mime,
                listMentions,
                metadata,
                isMsgMentioned,
                isQtdMentioned,
                isQuoted,
                isGroup,
                groupName,
                // components
                prefix,
                cmd,
                command,
                commands,
                details,
                desc,
                usage,
                participants,
                metadata,
                toUpper: function(query) {
                    return query.replace(/^\w/, c => c.toUpperCase())
                },
                toLower: function(query) {
                    return query.replace(/^\w/, c => c.toLowerCase())
                },
                Function: require("./lib"),
            }
            cmd.code(zanixon, m, cmdOptions);
        } catch(e) {
            console.error(e)
        }

    } catch (e) {
        console.log(util.format(e))
        zanixon.sendMessage('6285697103902@c.us', `*Error at ${m.author || m.id.remote} request:* \n\n` + util.format(e))
    }
}

global.reloadFile(__filename)
