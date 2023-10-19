const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "setsubject",
    aliases: ["setname"],
    type: "group",
    details: {
        desc: "Digunakan untuk mengubah nama grup",
        usage: "%prefix%command teks..."
    },
    code: async(zanixon, m, { zn, text, details }) => {
        if(text === "") return m.reply(zn.emoji("alert") + `︱Mana teks nya?\nContoh: *${details.usage}*`);
        let chat = await m.getChat()
        chat.setSubject(text).then((res) => {
            m.reply(zn.emoji("success") + `︱Berhasil mengubah nama grup!

➭ Nama baru: *${text}*`)
        }).catch((err) => {
            m.reply(zn.emoji("alert") + "︱Gagal mengubah nama grup!")
        })
    },
    isQuery: true,
    isGroup: true,
    isAdmin: true
}