const util = require("util")
const { jsonformat } = require("../../lib/Function")


module.exports = {
    name: "demote",
    aliases: ["unadmin"],
    type: "group",
    details: {
        desc: "Demote user dari admin",
        usage: "%prefix%command @user"
    },
    code: async(zanixon, m, { zn, participants }) => {
        let chat = await m.getChat()
        let members = participants.filter(v => v.isAdmin).map(v => v.id._serialized)
        let users = m.mentionedIds.filter(v => members.includes(v))
        for (let user of users) chat.demoteParticipants([user]).then((res) => {
            m.reply(zn.emoji("success") + "︱User berhasil di demote!")
        }).catch((err) => {
            m.reply(zn.emoji("failed") + "︱Gagal melakukan demote ke user!")
        })
    },
    isGroup: true,
    isAdmin: true
}