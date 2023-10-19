module.exports = {
    name: "public",
    aliases: ["selfmode"],
    type: "owner",
    details: {
        desc: "Mengubah mode bot menjadi public atau self",
        usage: "*Contoh:* %prefix%command true"
    },
    isOwner: true,
    code: async(zanixon, m, { zn, text, isPublic }) => {
        let choice = text;
        if(choice === "true") {
            if(isPublic === true) return m.reply(zn.emoji("alert") + `︱Bot sudah dalam mode *Public*!`);
            zn.set("public", true, null, "config", true);
            m.reply(zn.emoji("success") + `︱Berhasil mengubah mode bot!

*Bot info:*
➭ Mode: *Public*`);
        } else if(choice === "false") {
            if(isPublic === false) return m.reply(zn.emoji("alert") + `︱Bot sudah dalam mode *Self*!`);
            zn.set("public", false, null, "config", true);
            m.reply(zn.emoji("success") + `︱Berhasil mengubah mode bot!

*Bot info:*
➭ Mode: *Self*`);
        } else {
            m.reply(zn.emoji("alert") + `︱Input salah, silahkan gunakan boolean!`);
            return;
        }
    }
}