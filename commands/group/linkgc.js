module.exports = {
    name: "linkgroup",
    aliases: ["linkgc","linkinvite"],
    type: "group",
    details: {
        desc: "Mengambil link invite grup"
    },
    code: async(zanixon, m, { zn }) => {
        let chat = await m.getChat()
        if (chat.isGroup) {
            let link = await chat.getInviteCode()
            zanixon.sendMessage(m.from, `https://chat.whatsapp.com/${link}\n\nLink Group : ${chat.groupMetadata.name}`, { linkPreview: true })
        } else {
            m.reply(zn.emoji("alert") + "This Feature Only Group")
        }
    }
}