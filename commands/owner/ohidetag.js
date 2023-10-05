const { MessageMedia } = require("whatsapp-web.js")
const fs = require("fs")

module.exports = {
    name: "ohidetag",
    alias: ["ototag","otagall","ownerhidetag","ohide"],
    desc: "Send Message With Tag All Participants",
    type: "owner",
    code: async(zanixon, m, { participants, quoted, text }) => {
        let _participants = participants.map(v => v.id._serialized)
        let mentions = []
        for (let jid of _participants) mentions.push(await zanixon.getChatById(jid))
        if (m.hasMedia) {
            let message = await quoted.downloadMedia()
            zanixon.sendMessage(m.from, message, { mentions })
        } else {
            zanixon.sendMessage(m.from, text, { mentions })
        }
    },
    isGroup: true,
    isOwner: true,
    disable: true
}