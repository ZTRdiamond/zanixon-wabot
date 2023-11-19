const fs = require("fs")
const wa = require("whatsapp-web.js")
const util = require("util")

module.exports = {
    name: "eval",
    aliases: ["ev", ">", ">>", "=>"],
    desc: "Running JavaScript Code via Command",
    type: "owner",
    code: async(zanixon, m, {
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
        prefix,
        cmd,
        command,
        commands,
        details,
        desc,
        usage,
        participants
    }) => {
        let evaled
        try {
            if (text.endsWith("--sync")) {
                evaled = await eval(`(async () => { ${text.trim.replace("--sync", "")} })`)
                return m.reply(evaled)
            }
            evaled = await eval(text)
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
            await m.reply(evaled)
        } catch (e) {
            m.reply(util.format(e))
        }
    },
    isOwner: true
}