const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "setdesc",
    aliases: ["setdescription"],
    type: "group",
    details: {
        desc: "Digunakan untuk mengubah deskripsi grup",
        usage: "%prefix%command teks..."
    },
    code: async(zanixon, m, { zn, text, details }) => {
        if(text === "") return m.reply(zn.emoji("alert") + `︱Mana teks nya?\nContoh: *${details.usage}*`);
        let chat = await m.getChat()
        chat.setDescription(text).then((res) => {
            m.reply(zn.emoji("success") + `︱Berhasil mengubah deskripsi grup!

*Deskripsi saat ini:*
${text}`)
        }).catch((err) => {
            m.reply(zn.emoji("alert") + "︱Gagal mengubah deskripsi grup!")
        })
    },
    isQuery: true,
    isGroup: true,
    isAdmin: true
}