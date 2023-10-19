const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "ytmp4",
    aliases: ["ytv"],
    type: "downloader",
    details: {
        desc: "Download video from youtube",
        usage: "%prefix%command https://youtu.be/3Xw-9OE1j-Y"
    },
    code: async(zanixon, m, { readmore, zn, text, sender }) => {
        const ytdl = require("ytdl-core");
        const url = text;
        
        if(url.length === 0) {
            m.reply(zn.emoji("alert") + "︱Mana url nya? \nContoh: *.ytv https://youtu.be/3Xw-9OE1j-Y*");
            return;
        }
        m.reply("⏱️︱Tunggu sebentar, permintaan sedang di proses!");
        
        try {
            if(!ytdl.validateURL(url)) {
                m.reply(zn.emoji("alert") + "︱Url video youtube tidak valid!");
                return;
            }
            
            const data = await ytdl.getInfo(url);
            const sortedVideo = data.formats
                .filter((format) => format.hasVideo && format.hasAudio)
                .sort((a, b) => (b.width * b.height) - (a.width * a.height));
            const info = data.videoDetails;
            const thumbnail = data.videoDetails.thumbnails.sort((a, b) => b.width - a.width).find((thumbnail) => thumbnail.width > 1000 || thumbnail.width > 700 || thumbnail.width > 600 || thumbnail.width > 500 || thumbnail.width > 400 || thumbnail.width > 300 || thumbnail.width > 200 || thumbnail.width > 100);
            const resVideo = sortedVideo[0];
            const fileSize = parseInt(resVideo.contentLength) / (1024 * 1024);
            console.log("YTMP4 File Size:", fileSize.toFixed(2) + "MB")
            if(fileSize > 100) {
                m.reply(zn.emoji("alert") + `︱Permintaan dibatalkan karena ukuran video terlalu besar dari max 100mb standar whatsapp.

*Media info:*
➭ Url: *${url}*
➭ Judul: *${info.title}*
➭ Ukuran: *${fileSize.toFixed(2)}MB*
`);
                return;
            }
            let teks = `*Video info:*
➭ Judul: *${info.title}*
➭ Durasi: *${info.lengthSeconds}*
➭ Reso: *${resVideo.qualityLabel}*
➭ Ukuran: *${fileSize.toFixed(2)}MB*`;
            let media = await MessageMedia.fromUrl(resVideo.url, { unsafeMime: true, filename: `${info.title}.mp4` });
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: teks });
            console.log("Success download youtube video:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                size: `${fileSize.toFixed(2)}MB`,
                youtube_url: url,
                cdn_youtube: resVideo.url
            }, null, 2));
        } catch(error) {
            console.log("Error at ytmp4: \n" + error);
            m.reply(zn.emoji("failed") + "︱Terjadi kesalahan saat memproses command!");
            return;
        }
    }
}