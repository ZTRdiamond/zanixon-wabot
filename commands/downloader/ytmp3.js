const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "ytmp3",
    aliases: ["yta"],
    type: "downloader",
    details: {
        desc: "Download audio from youtube",
        usage: "%prefix%command https://youtu.be/rKsQ-3N-Bks"
    },
    code: async(zanixon, m, { downloader, zn, text, details, utils, sender }) => {
        const url = text;
        
        if(url == "") return m.reply(zn.emoji("alert") + `︱Mana url youtube nya?\nContoh: *${details.usage}`);
        m.reply(zn.emoji("wait") + `︱Tunggu sebentar, permintaan sedang diproses!`);
        try {
            const data = await downloader.yta(url);
            const fileSize = data.mediaSize / (1024 * 1024);
            const info = data.videoInfo;
            //console.log(data, fileSize, info);
            if(data.status == false) return m.reply(zn.emoji("alert") + "︱Url video youtube tidak valid!");
            if(fileSize >= 100) return m.reply(zn.emoji("failed") + `︱Gagal mengunduh video karna ukuran audio terlalu besar untuk dikirimkan lewat whatsapp!

*Video Info:*
➭ Judul: *${info.title}*
➭ Url: *${url}*
➭ Ukuran: *${utils.formatBytes(data.mediaSize)}* dari max *100 MB*`); 
            let teks = `*Video Info:*
➭ Judul: *${info.title}*
➭ Resolusi: *${data.media.qualityLabel}*
➭ Ukuran: *${utils.formatBytes(data.mediaSize)}*`;
            let media = await MessageMedia.fromUrl(data.media.url, { unsafeMime: true, filename: `${info.title}.mp3` });
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: teks });
            console.log("Success download youtube audio:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                size: `${utils.formatBytes(data.mediaSize)}`,
                youtube_url: url,
                cdn_youtube: data.media.url
            }, null, 2));
        } catch(error) {
            console.log("Error at ytmp3: \n" + error);
            m.reply(zn.emoji("failed") + "︱Terjadi kesalahan saat memproses command!");
            return;
        }
    }
}