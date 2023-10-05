module.exports = {
    name: "delpremium",
    alias: ["delprem"],
    type: "akun",
    isOwner: true,
    code: async(zanixon, m, { zn, text, quoted }) => {
        let teks = text.split("|");
        let regex = /[@+]|@c\.us/g;
        let raw = teks[0].replace(regex, "");
        let rep = raw.replace("-reply", quoted.author);
        let user = rep.replaceAll(regex, "") + "@c.us";
        let isPremium = zn.get("premium", user, null, true);
        let num = user.replace("@c.us", "");
        if(text === undefined) {
            m.reply(zn.emoji("alert") + `︱Mana user yang akan dihapus premium nya?

*Options:*
➭ mention
➭ -reply
➭ 628xxx`);
        }
        if(isPremium === false) return m.reply(zn.emoji("alert") + `︱User tidak premium sebelumnya!`);
        let premium = zn.set("premium", false, user, null, true);
        zn.set("premiumDuration", "0 hari, 0 jam, 0 menit, 0 detik", user, null, true);
        zn.set("premiumTimestamp", 0, user, null, true);
        let msg = `${zn.emoji("success")}︱Berhasil menghapus *premium* dari user!

*User info:*
➭ Status: *${premium}*
➭ Nomor: *${num}*
➭ Url: *wa.me/${num}*`;
        m.reply(msg);
    }
}