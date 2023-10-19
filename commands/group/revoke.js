const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "revoke",
    aliases: ["reset","resetlink"],
    type: "group",
    details: {
        desc: "Reset link grup"
    },
    code: async(zanixon, m, { zn }) => {
        let chat = await m.getChat()
        if (chat.isGroup) {
            await chat.revokeInvite().then((res) => {
                m.reply(zn.emoji("success") + "︱Berhasik reset link grup!")
            }).catch((err) => {
                m.reply(zn.emoji("failed") + "︱Gagal reset link grup!")
            })
        } else {
            m.reply("This Feature Only Group")
        }
    },
    isAdmin: true
}