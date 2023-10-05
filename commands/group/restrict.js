const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "restrict",
    alias: ["editinfo"],
    desc: "Set Restrict Group",
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