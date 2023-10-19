const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "restrict",
    aliases: ["editinfo"],
    type: "group",
    details: {
        desc: "Mengubah pengaturan editgrup menjadi semua orang atau admin saja",
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
                chat.setInfoAdminsOnly(false).then((res) => {
                    m.reply(zn.emoji("success") + "︱Berhasil menjadikan edit info grup dapat di edit oleh seluruh member!")
                }).catch((err) => {
                    m.reply(zn.emoji("failed") + "︱Gagal menjadikan edit info grup dapat di edit oleh seluruh member, mungkin sudah aktif sebelumnya!")
                })
            break
            case "close":
            case "tutup":
            case "0":
            case "no":
            case "false":
                chat.setInfoAdminsOnly(true).then((res) => {
                    m.reply(zn.emoji("success") + "︱Berhasil menjadikan edit info grup hanya dapat di edit oleh admin!")
                }).catch((err) => {
                    m.reply(zn.emoji("failed") + "︱Gagal menjadikan edit info grup hanya dapat di edit oleh admin, mungkin sudah aktif sebelumnya!")
                })
            break
        }
    },
    isGroup: true,
    isQuery: true,
    isAdmin: true
}