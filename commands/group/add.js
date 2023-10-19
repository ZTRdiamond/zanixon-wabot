const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "add",
    alias: ["undang","culik"],
    type: "group",
    details: {
        desc: "Menambahkan user ke grup",
        usage: "%prefix%command 62xxx"
    },
    code: async(zanixon, m, { zn, quoted, text, participants, details }) => {
        if(text === "") return m.reply(zn.emoji("alert") + `︱Mana nomor nya?\nContoh: *${details.usage}*`);
        let chat = await m.getChat()
        let _participants = participants.map(v => v.id._serialized)
        let users = (await Promise.all(
            text.split(",")
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + 'c.us'))
            .map(async v => [
                v,
                await zanixon.isRegisteredUser(v + '@c.us')
            ])
        )).filter(v => v[1]).map(v => v[0] + '@c.us')
        chat.addParticipants(users).then((res) => {
            m.reply(`${zn.emoji("success")}│Berhasil menambahkan user!`)
        }).catch((err) => {
            m.reply(zn.emoji("failed") + "︱Gagal menambahkan user!")
        })
    },
    isGroup: true,
    isAdmin: true
}
