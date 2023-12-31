module.exports = {
    name: "addpremium",
    aliases: ["addprem"],
    type: "akun",
    isOwner: true,
    details: {
        desc: "Menambahkan user menjadi premium!",
        usage: "%prefix%command opt|(duration: s, m, h, d, w, mo, y)"
    },
    code: async(zanixon, m, { utils, prefix, zn, text, quoted }) => {
        let teks = text.split("|");
        let regex = /[@+]|@c\.us/g;
        let raw = teks[0].replace(regex, "");
        let rep = raw.replace("-reply", `${quoted.author}`.replace("@c.us", ""));
        let user = rep.replaceAll(regex, "") + "@c.us";
        let isPremium = zn.get("premium", user, null, true);
        let num = user.replace(regex, "");
        if(isPremium === true) return m.reply(zn.emoji("success") + `︱Gagal menambahkan premium, Karna user sudah premium!`);
        if(teks[0] !== "" && teks[1] !== "") {
            try {
                let duration = Date.now() + utils.parseTime(teks[1]);
                let prem = zn.set("premium", true, user, null, true);
                let dur = zn.set("premiumDuration", utils.parseUnix(duration), user, null, true);
                let unix = zn.set("premiumTimestamp", duration, user, null, true);
                m.reply(zn.emoji("success") + `︱Berhasil menambahkan *Premium*!

*User info:*
➭ Premium: *${prem ? "🟢" : "🔴"}*
➭ Expired: *${utils.parseUnix(duration)}*`);
            } catch(err) {
                m.reply(zn.emoji("failed") + `︱Gagal menambahkan user sebagai premium!`);
                console.log("Error at addpremium.js:", err);
            }
        } else {
            m.reply(zn.emoji("alert") + `︱Mana user yang akan dijadikan *Premium*?

*Options:*
➭ mention: mention user
➭ -reply: balas pesan user
➭ 628xxx: nomor user

Contoh: *${prefix}addpremium -reply|30d*`);
        }
    }
}