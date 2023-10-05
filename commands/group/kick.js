const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "kick",
    alias: ["tendang"],
    desc: "Remove User From Group",
    type: "group",
    example: "Example : %prefix%command <tag>. <tag> = @62xxx",
    code: async(zanixon, m, { zn, quoted, text, participants }) => {
        let chat = await m.getChat()
        let users = m.mentionedIds[0] ? m.mentionedIds : m.hasQuotedMsg ? [quoted.from] : [text.replace(/[^0-9]/g, '') + "@c.us"]
        for (let user of users) chat.removeParticipants([user]).then((res) => {
            m.reply(zn.emoji("success") + "︱Berhasil mengeluarkan user!")
        }).catch((err) => {
            m.reply(zn.emoji("failed") + "︱Gagal mengeluarkan user, mungkin user sudah di kick sebelumnya!")
        })
    },
    isGroup: true,
    isAdmin: true
}