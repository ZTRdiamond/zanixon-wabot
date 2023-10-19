module.exports = {
    name: "delete",
    aliases: ["del"],
    type: "tool",
    details: {
        desc: "Menghapus pesan yang dikirim oleh member di grup atau dikirim oleh bot di private chat",
        usage: "Balas pesan bot/member dengan %prefix%command"
    },
    isBotAdmin: true,
    isGroup: true,
    code: async(zanixon, m, { zn, sender, isQuoted, quoted }) => {
        if(m.hasQuotedMsg) {
            quoted.delete(true);
            m.delete(true);
        } else {
            m.reply(zn.emoji("alert") + "︱Balas pesan yang akan dihapus!");
        }
    }
}