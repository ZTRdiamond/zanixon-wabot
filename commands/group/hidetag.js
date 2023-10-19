module.exports = {
    name: "hidetag",
    aliases: ["totag","tagall"],
    details: {
        desc: "Kirim pesan dengan mention seluruh member di grup, command ini support gambar!",
    },
    type: "group",
    code: async(zanixon, m, { zn, participants, quoted, prefix, command }) => {
        let text = `${quoted.body}`.replace(prefix + command, "") || `${m.body}`.replace(prefix + command, "");
        if(quoted.hasMedia) {
            let media = await quoted.downloadMedia();
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, caption: text || "", mentions: participants.map(a => a.id._serialized) });
        } else {
            zanixon.sendMessage(m.id.remote, text || "", { quotedMessageId: m.id._serialized, mentions: participants.map(a => a.id._serialized) });
        }
    },
    isGroup: true,
    isAdmin: true
}