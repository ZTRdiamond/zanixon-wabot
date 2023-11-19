const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "twitter",
    aliases: ["twdl","twitterdl","tw"],
    type: "downloader",
    details: {
        desc: "Download video from twitter",
        usage: "%prefix%command https://twitter.com/MatalinoMSiraj/status/1717907568851661018"
    },
    code: async(zanixon, m, { downloader, zn, text, details, sender }) => {
        let urltw = text;
        if(urltw === "") return m.reply(zn.emoji("alert") + `︱Mana url twitter nya?\nContoh: *${details.usage}*`);
        m.reply(zn.emoji("wait") + `︱Tunggu sebentar, permintaan sedang diproses!`);
        try {
            const res = await downloader.twdl(urltw);
            const data = res.data;
            const media = await MessageMedia.fromUrl(data.media, { unsafeMime: true, filename: `ZanixonMD-TWITTERDL-Media.mp4` });
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id_serialized, caption: data.caption, sendMediaAsDocument: true }).then(() => {
                console.log("Success download twitter video:", JSON.stringify({
                    user: sender,
                    name: m._data.notifyName,
                    instagram_url: urltw,
                    cdn_twitter: data.media
                }, null, 2));
            })
        } catch (e) {
            console.log("Error at twitter.js:", e);
            m.reply(zn.emoji("failed") + `︱Gagal mendownload video, pastikan url/link sudah benar!`)
        }
    }
}