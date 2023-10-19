const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "facebook",
    aliases: ["fb", "fbdl", "fbdownloader", "facebookdl"],
    type: "downloader",
    code: async(zanixon, m, { sender, text, zn }) => {
        const getFBInfo = require("@xaviabot/fb-downloader");
        let args = text;
        if(!args) {
            m.reply(zn.emoji("alert") + "︱Mana url video facebook nya? \nContoh: *.fbdl https://fb.watch/n8KbEBZTR2*");
            return;
        }
        try {
            m.reply(zn.emoji("wait") + "︱Tunggu sebentar, permintaan sedang diproses!");
            const data = await getFBInfo(args);
            if(data === undefined) {
                m.reply(zn.emoji("failed") + "︱Gagal mendownload video, data dari url tersebut tidak dapat ditemukan!");
                return;
            }
            let url = data.hd || data.sd;
            const media = await MessageMedia.fromUrl(url, { unsafeMime: true });
            const thumb = await MessageMedia.fromUrl(data.thumbnail, { unsafeMime: true, filename: "ZanixonMD-FBDL-Media.mp4" });
            m.reply(thumb, null, { caption: `*Content Preview:*
➭ Judul: *${data.title}*` });
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, sendMedicaption: data.title, sendMediaAsDocument: true, caption: `Ini video facebook nya kak!` });
            console.log("Success download facebook video:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                facebook_url: args,
                cdn_facebook: url
            }, null, 2));
        } catch(err) {
            console.log("Error at facebook.js: ", err);
            m.reply(zn.emoji("failed") + "︱Gagal mendownload video, mungkin terjadi suatu kesalahan pada sistem!");
            zanixon.sendMessage("6285697103902@c.us", `Error at facebook.js on chat "${sender}\n\n"` + err);
        }
    }
}