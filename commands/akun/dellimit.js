module.exports = {
    name: "dellimit",
    aliases: ["limitdel","delimit"],
    type: "akun",
    isOwner: true,
    details: {
        desc: "Mengurangi limit user secara spesifik",
        usage: "%prefix%command 628xxx (nomor)|10 (amount)"
    },
    code: async(zanixon, m, { zn, sender, text, quoted, isQuoted }) => {
        let split = text.split("|");
        let user = split[0];
        let amount = split[1] || split[0];
        if(amount < 1) return m.reply(zn.emoji("alert") + `︱Jumlah limit tidak boleh kosong atau kurang dari 1!`);
        if(isQuoted == true) {
            let quotedId = quoted.author || quoted.id.remote;
            let limit = zn.get("limit", quotedId, null, false);
            zn.set("limit", Math.floor(limit - parseInt(amount)), quotedId, null, false);
            m.reply(zn.emoji("success") + `︱Berhasil mengurangi limit user!

*Details:*
➭ UserID: *${quotedId}*
➭ Limit: *${limit} --> ${limit - parseInt(amount)}*`);
        } else if(user !== "") {
            let userId = user.replace("@", "").replace("+", "") + "@c.us";
            let limit = zn.get("limit", userId, null, false);
            zn.set("limit", Math.floor(limit - parseInt(amount)), userId, false);
            m.reply(zn.emoji("success") + `︱Berhasil mengurangi limit user!

*Details:*
➭ UserID: *${userId}*
➭ Limit: *${limit} --> ${limit - parseInt(amount)}*`);
        } else {
            m.reply(zn.emoji("alert") + `Balas pesan user atau ketik manual nomor user untuk mengurangi limit!

*Contoh:*
➭ Reply: *.addlimit 10*
➭ Ketik: *.addlimit 628xxx|10*`);
            return;
        }
    }
}