module.exports = {
    name: "unbanned",
    alias: ["unban"],
    type: "akun",
    isOwner: true,
    code: async(zanixon, m, { zn, sender, text, quoted }) => {
        if(text === undefined || text === "") {
            m.reply(zn.emoji("alert") + `︱Mana user yang akan dibanned?

*Options:*
➭ mention
➭ -reply
➭ 628xxx`);
        }
        let raw = text.replace(/@|@c.us|\+|-reply/g, (match) => {
            if (match === "@c.us") return "";
            if (match === "@") return "";
            if (match === "+") return "";if (match === "-reply") return quoted?.author?.replace("@c.us", "");
        });
        let user = raw + "@c.us";
        let num = user.replace("@c.us", "");
        let isBanned = zn.get("banned", user, null, true);
        if(isBanned === false) {
            m.reply(zn.emoji("alert") + "︱User telah di unbanned atau belum terbanned sebelumnya!");
            return;
        }
        let ban = zn.set("banned", false, user, null, true);
        let teks = `${zn.emoji("success")}︱Berhasil unbanned user!

*User info:*
➭ Status: *${ban}*
➭ Nomor: *${num}*
➭ Url: *wa.me/${num}*`;
        m.reply(teks);
    }
}