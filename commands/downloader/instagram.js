const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "instagram",
    aliases: ["ig","igdl","instagramdl"],
    details: {
        desc: "Download foto/video/reels instagram",
        usage: "%prefix%command https://www.instagram.com/p/Cs3SHq-hRkP"
    },
    type: "downloader",
    code: async(zanixon, m, { downloader, details, text, zn, sender, axios }) => {
        let urlpost = text;
        if(!urlpost) return m.reply(zn.emoji("alert") + `︱Mana url post instagram nya?\nContoh: *${details.usage}*`);
        m.reply(zn.emoji("wait") + "︱Tunggu sebentar, permintaan sedang diproses!");
        try {
            let res = await downloader.igdl(urlpost);
            if(res.false === false) return m.reply(zn.emoji("failed") + "︱Gagal mendownload media, pastikan url/link postingan instagram sudah benar!")
            
            m.reply(`*Instagram Post Info:*
➭ Url Post: *${urlpost}*
➭ Total Media: *${res.mediaCount}*`);
            let urlCount = res.mediaCount;
            let now = 0;
            async function igdl() {
                try {
                    if(now < urlCount) {
                        let data = res.data[now];
                        let mediatype = data.type;
                        let url = data.url;
                        let teks = `*Instagram Media Info:*
➭ Media count: *${now + 1}/${res.mediaCount}*
➭ Type: *${data.type}*`;
                        if(mediatype === "image") {
                            let media = await MessageMedia.fromUrl(url, { unsafeMime: true, filename: `ZanixonMD-IGDL-Media_${now + 1}.jpg` });
                            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, caption: teks, sendMediaAsDocument: false });
                        } else if(mediatype === "video") {
                            let media = await MessageMedia.fromUrl(url, { unsafeMime: true, filename: `ZanixonMD-IGDL-Media_${now + 1}.mp4` });
                            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, caption: teks, sendMediaAsDocument: true });
                        } else {
                            m.reply(zn.emoji("failed") + `︱Gagal mendownload media nomor *${now + 1}* karna tidak valid!`)
                        }
                        now++;
                        setTimeout(igdl, 15000);
                    }
                } catch(err) {
                    console.log(`Error at ${__dirname}: ${err}`);
                }
            }
            igdl().catch(error => {
                console.log(`Error at ${__dirname}: ${err}`);
            })
            console.log("Success download instagram media:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                instagram_url: urlpost,
                cdn_instagram: res.data
            }, null, 2));
        } catch(err) {
            console.log("Error at instagram.js: ", err);
            m.reply(zn.emoji("failed") + `︱Terjadi suatu kesalahan pada sistem saat memproses permintaan!`);
        }
    }
}