module.exports = {
    name: "akun",
    alias: ["limit"],
    type: "akun",
    code: async(zanixon, m, { zn, sender, utils }) => {
        let nick = m._data.notifyName;
        let limit = zn.get("limit", sender, null, true);
        let premium = zn.get("premium", sender, null, true) ? "🟢" : "🔴";
        let premUnix = zn.get("premiumTimestamp", sender, null, true);
        let premiumTimer = (premUnix >= Date.now()) ? `\n➭ Expired: *${utils.parseUnix(zn.get("premiumTimestamp", sender, null, true), "{d} hari, {h} jam, {min} menit, {sec} detik")}*` : "";
        let teks = `*User info:*
➭ Premium: *${premium}* ${premiumTimer}
➭ Limit: *${zn.abbreviate(limit, "0.00a")}*
➭ Name: *${nick}*
➭ Number: *${sender.replace("@c.us", "")}*`;
        m.reply(teks);
    }
}