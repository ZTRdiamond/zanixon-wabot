module.exports = {
    name: "nsfw",
    alias: ["nsfwmode"],
    type: "nsfw",
    details: {
        desc: "Mengubah mode nsfw menjadi on/off",
        usage: "%prefix%command on/off"
    },
    code: async(zanixon, m, { zn, text, isNsfw, isGroup, isAdmin, details }) => {
        let db = "default";
        let choice = text;
        if(isGroup === true) {
            if(!isAdmin) return m.reply(zn.emoji("alert") + "︱Command khusus admin!");
            if(choice == "on") {
                if(isNsfw == true) return m.reply(zn.emoji("alert") + `︱Mode *Nsfw* sudah aktif di grup ini!`); 
                zn.set("isNsfw", true, m.id.remote, db, false);
                m.reply(zn.emoji("success") + `︱Berhasil mengaktifkan mode *Nsfw* di grup ini!

*Chat info:*
➭ Type: *Grup*
➭ Nsfw: *On 🟢*
➭ ChatID: *${m.id.remote}*`);
            } else if(choice == "off") {
                if(isNsfw == false) return m.reply(zn.emoji("alert") + `︱Mode *Nsfw* sudah nonaktif di grup ini!`); 
                zn.set("isNsfw", false, m.id.remote, db, false);
                m.reply(zn.emoji("success") + `︱Berhasil menonaktifkan mode *Nsfw* di grup ini!

*Chat info:*
➭ Type: *Grup*
➭ Nsfw: *Off 🔴*
➭ ChatID: *${m.id.remote}*`);
            } else {
                m.reply(zn.emoji("alert") + `︱Pengunaan salah!\nContoh: ${details.usage}`)
            }
        } else {
            if(choice == "on") {
                if(isNsfw == true) return m.reply(zn.emoji("alert") + `︱Mode *Nsfw* sudah aktif di grup ini!`); 
                zn.set("isNsfw", true, m.id.remote, db, false);
                m.reply(zn.emoji("success") + `︱Berhasil mengaktifkan mode *Nsfw* di grup ini!

*Chat info:*
➭ Type: *Private Chat*
➭ Nsfw: *On 🟢*
➭ ChatID: *${m.id.remote}*`);
            } else if(choice == "off") {
                if(isNsfw == false) return m.reply(zn.emoji("alert") + `︱Mode *Nsfw* sudah nonaktif di grup ini!`); 
                zn.set("isNsfw", false, m.id.remote, db, false);
                m.reply(zn.emoji("success") + `︱Berhasil menonaktifkan mode *Nsfw* di grup ini!

*Chat info:*
➭ Type: *Private Chat*
➭ Nsfw: *Off 🔴*
➭ ChatID: *${m.id.remote}*`);
            } else {
                m.reply(zn.emoji("alert") + `︱Pengunaan salah!\nContoh: ${details.usage}`)
            }
        }
    }
}