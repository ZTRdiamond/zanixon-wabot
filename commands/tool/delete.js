module.exports = {
    name: "delete",
    aliases: ["del"],
    type: "tool",
    details: {
        desc: "Menghapus pesan yang dikirim oleh bot",
        usage: "Balas pesan bot dengan %prefix%command"
    },
    code: async(zanixon, m, { zn, sender, isQuoted, quoted }) => {
        if(!isQuoted) {
            if(!quoted.fromMe) return m.reply(zn.emoji("failed") + "︱Pesan tersebut tidak dapat dihapus karna pengirim bukan saya!");
            quoted.delete(true);
        } else {
            m.reply(zn.emoji("alert") + "︱Balas pesan bot yang akan dihapus!");
        }
    }
}