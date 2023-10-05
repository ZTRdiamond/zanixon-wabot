module.exports = {
    name: "saran",
    type: "main",
    code: async(zanixon, m, { text, zn, sender, getRandom }) => {
        if(text) {
            m.reply(`Halo *${m._data.notifyName}*, Terima kasih udah memberikan saran.

Saran kamu udah dikirim ke developer dan akan dibaca nanti, Jika saranmu di *terima* nanti kamu bakal dapet pesan bahwa saran disetujui sama developer.

*Note:* jangan spam saran atau nanti bakal di *tolak* langsung saran kamu!`);
            zanixon.sendMessage("62856971039020@c.us", `*Saran baru dari user:*
Status: terima/tolak?
Nomor: *wa.me/${sender.replace("@c.us", "").replace("@g.us", "")}*
Nama: *${m._data.notifyName}*
Saran:
${text}`);
        } else {
            m.reply(zn.emoji("alert") + "・Masukan saran yang benar!\n Contoh: *.saran fitur fbdl bg*");
        }
    }
}