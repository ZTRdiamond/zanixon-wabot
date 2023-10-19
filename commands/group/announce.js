const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "group",
    aliases: ["grup","announce","anounce"],
    type: "group",
    details: {
        desc: "Digunakan untuk membuka atau menutup grup",
        usage: "%prefix%command buka/tutup atau open/close"
    },
    code: async(zanixon, m, { zn, text, args }) => {
        let chat = await m.getChat()
        switch(text.toLowerCase()) {
            case "buka":
            case "open":
            case "1":
            case "yes":
            case "true":
                chat.setMessagesAdminsOnly(false).then((res) => {
                    m.reply(zn.emoji("success") + "︱Grup berhasil dibuka dan semua member dapat mengirim pesan sekarang!")
                }).catch((err) => {
                    m.reply(zn.emoji("failed") + "︱Gagal menutup grup, mungkin grup sudah dibuka sebelumnya!")
                });
            break
            case "close":
            case "tutup":
            case "0":
            case "no":
            case "false":
                chat.setMessagesAdminsOnly(true).then((res) => {
                    m.reply(zn.emoji("success") + "︱Grup berhasil ditutup dan hanya admin yang dapat mengirim pesan!")
                }).catch((err) => {
                    m.reply(zn.emoji("failed") + "︱Gagal menutup grup, mungkin grup sudah ditutup sebelumnya!")
                })
            break
        }
    },
    isGroup: true,
    isQuery: true,
    isAdmin: true
}