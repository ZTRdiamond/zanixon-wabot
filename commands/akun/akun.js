module.exports = {
   name: "limit",
   aliases: ["akun"],
   type: "akun",
   code: async (zanixon, m, { zn, sender, text, utils, totalRequest, isQuoted, quoted }) => {
      let userId = text.replace("@", "").replace("+", "") + "@c.us";
      if (isQuoted) {
         let quotedId = quoted.author || quoted.id.remote;
         let nick = quotedId._data.notifyName;
         let limit = zn.get("limit", quotedId, null, true);
         let premium = zn.get("premium", quotedId, null, true) ? "🟢" : "🔴";
         let premUnix = zn.get("premiumTimestamp", quotedId, null, true);
         let premiumTimer = (premUnix >= Date.now()) ? `\n➭ Expired: *${utils.parseUnix(zn.get("premiumTimestamp", quotedId, null, true), "{d} hari, {h} jam, {min} menit, {sec} detik")}*` : "";
         let teks = `*User info:*
➭ Premium: *${premium}* ${premiumTimer}
➭ Limit: *${zn.abbreviate(limit, "0.00a")}*
➭ Name: *${nick}*
➭ Number: *${sender.replace("@c.us", "")}*
➭ Total Request: *${zn.abbreviate(totalRequest, "0.00a")}*`;
         m.reply(teks);
      } else if (userId !== "") {
         let nick = userId._data.notifyName;
         let limit = zn.get("limit", userId, null, true);
         let premium = zn.get("premium", userId, null, true) ? "🟢" : "🔴";
         let premUnix = zn.get("premiumTimestamp", userId, null, true);
         let premiumTimer = (premUnix >= Date.now()) ? `\n➭ Expired: *${utils.parseUnix(zn.get("premiumTimestamp", userId, null, true), "{d} hari, {h} jam, {min} menit, {sec} detik")}*` : "";
         let teks = `*User info:*
➭ Premium: *${premium}* ${premiumTimer}
➭ Limit: *${zn.abbreviate(limit, "0.00a")}*
➭ Name: *${nick}*
➭ Number: *${sender.replace("@c.us", "")}*
➭ Total Request: *${zn.abbreviate(totalRequest, "0.00a")}*`;
         m.reply(teks);
      } else {
         m.reply(zn.emoji("alert") + `︱Gunakan opsi dengan benar!

*Details:*
➭ Reply: *.limit*
➭ Nomor: *.limit 628xxx*`);
      }
   }
}