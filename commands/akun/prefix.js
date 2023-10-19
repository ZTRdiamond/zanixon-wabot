module.exports = {
    name: "prefix",
    aliases: ["changeprefix","gantiprefix"],
    type: "akun",
    details: {
        desc: "Mengganti prefix untuk memanggil perintah bot",
        usage: "%prefix%command c!"
    },
    code: async(zanixon, m, { sender, zn, text, details }) => {
        let prefix = text;
        let old = zn.get("prefix", sender, null, true);
        if(prefix) {
            zn.set("prefix", prefix, sender, null, true);
            m.reply(zn.emoji("success") + `︱Berhasil mengubah prefix bot!

*Info:*
Old: *${old}*
New: *${prefix}*`);
        } else {
            m.reply(zn.emoji("failed") + `︱Gagal mengubah prefix!\nContoh: *${details.usage}*`);
        }
    }
}