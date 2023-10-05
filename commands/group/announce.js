const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "group",
    alias: ["grup","announce","anounce"],
    desc: "Set Announce Group",
    type: "group",
    example: "List Option :\n\n1. open\n2. close\n3.buka\n4. tutup\n\nExample : %prefix%command buka",
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