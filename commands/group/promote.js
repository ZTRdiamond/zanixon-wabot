const util = require("util")
const { jsonformat } = require("../../lib/Function")


module.exports = {
    name: "promote",
    alias: ["admin"],
    desc: "Make Admin User from Group",
    type: "group",
    example: "Example : %prefix%command <tag>. <tag> = @62xxx",
    code: async(zanixon, m, { zn, participants }) => {
        let chat = await m.getChat()
        let members = participants.filter(v => !v.isAdmin).map(v => v.id._serialized)
        let users = m.mentionedIds.filter(v => members.includes(v))
        for (let user of users) chat.promoteParticipants([user]).then((res) => {
            m.reply(zn.emoji("success") + "︱Berhasil menjadikan user sebagai admin!")
        }).catch((err) => {
            m.reply(zn.emoji("failed") + "︱Gagal menjadikan user sebagai admin!")
        })
    },
    isGroup: true,
    isAdmin: true
}