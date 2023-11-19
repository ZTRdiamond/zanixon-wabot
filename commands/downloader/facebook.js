const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "facebook",
    aliases: ["fb", "fbdl", "fbdownloader", "facebookdl"],
    type: "downloader",
    code: async(zanixon, m, { downloader, sender, text, zn }) => {
        let urlfb = text;
        if(!urlfb) {
            m.reply(zn.emoji("alert") + "︱Mana url video facebook nya?\nContoh: *.fbdl https://fb.watch/n8KbEBZTR2*");
            return;
        }
        try {
            m.reply(zn.emoji("wait") + `︱Tunggu sebentar, permintaan sedang diproses!`);
            const res = await downloader.fbdl(urlfb);
            const data = res.data;
            if(res.status === false) {
                try {
                    const resAlt = await downloader.fbdlv2(urlfb);
                    //console.log("Test fbdl:", resAlt);
                    const dataAlt = resAlt.data;
                    const urlAlt = dataAlt.video;
                    const mediaAlt = await MessageMedia.fromUrl(urlAlt, { unsafeMime: true, filename: "ZanixonMD-FBDL-Media.mp4" });
                    const thumbAlt = await MessageMedia.fromUrl(dataAlt.thumb, { unsafeMime: true, filename: "ZanixonMD-FBDL-Media.mp4" });
                    m.reply(thumbAlt, null, { caption: `*Content Preview:*
➭ Judul: *${data.caption}*` });
                    zanixon.sendMessage(m.id.remote, mediaAlt, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: `Ini video facebook nya kak!` });
                    console.log("Success download facebook video:", JSON.stringify({
                        user: sender,
                        name: m._data.notifyName,
                        facebook_url: data.post,
                        cdn_facebook: urlAlt
                    }, null, 2));
                    return;
                } catch(err) {
                   console.log("Error at facebook.js: ", err);
                    m.reply(zn.emoji("failed") + "︱Gagal mendownload video, pastikan url/link sudah benar!");
                    return;
                }
            }
            let url = data.video;
            const media = await MessageMedia.fromUrl(url, { unsafeMime: true });
            const thumb = await MessageMedia.fromUrl(data.thumb, { unsafeMime: true, filename: "ZanixonMD-FBDL-Media.mp4" });
            m.reply(thumb, null, { caption: `*Content Preview:*
➭ Judul: *${data.caption}*` });
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: `Ini video facebook nya kak!` });
            console.log("Success download facebook video:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                facebook_url: data.post,
                cdn_facebook: url
            }, null, 2));
        } catch(err) {
            console.log("Error at facebook.js: ", err);
            m.reply(zn.emoji("failed") + "︱Gagal mendownload video, pastikan url/link sudah benar!");
        }
    }
}