const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "ytmp3",
    aliases: ["yta"],
    type: "downloader",
    details: {
        desc: "Download audio dari youtube",
        usage: "%prefix%command https://youtu.be/3Xw-9OE1j-Y"
    },
    code: async(zanixon, m, { readmore, zn, text, sender }) => {
        const ytdl = require("ytdl-core");
        const url = text;
        
        if(url.length === 0) {
            m.reply(zn.emoji("alert") + "︱Mana url nya? \nContoh: *.yta https://youtu.be/3Xw-9OE1j-Y*");
            return;
        }
        m.reply("⏱️︱Tunggu sebentar, permintaan sedang di proses!");
        
        try {
            if(!ytdl.validateURL(url)) {
                m.reply(zn.emoji("alert") + "︱Url video youtube tidak valid!");
                return;
            }
            
            const data = await ytdl.getInfo(url);
            const sortedAudio = data.formats.filter((format) => format.hasAudio).sort((a, b) => b.audioBitrate - a.audioBitrate);
            //console.log(sortedAudio);
            const info = data.videoDetails;
            const thumbnail = data.videoDetails.thumbnails.sort((a, b) => b.width - a.width).find((thumbnail) => thumbnail.width > 1000 || thumbnail.width > 700 || thumbnail.width > 600 || thumbnail.width > 500 || thumbnail.width > 400 || thumbnail.width > 300 || thumbnail.width > 200 || thumbnail.width > 100);
            const resAudio = sortedAudio[0];
            const fileSize = parseInt(resAudio.contentLength) / (1024 * 1024);
            if(fileSize > 100) {
                m.reply(zn.emoji("alert") + `︱Permintaan dibatalkan karena ukuran audio terlalu besar dari max 100mb standar whatsapp.

*Media info:*
➭ Url: *${url}*
➭ Judul: *${info.title}*
➭ Ukuran: *${fileSize.toFixed(2)}MB*
`);
                return;
            }
            console.log(resAudio.url);
            const media = await MessageMedia.fromUrl(resAudio.url, { unsafeMime: true, filename: `${info.title}.mp3` });
            let teks = `*Audio info:*
➭ Judul: *${info.title}*
➭ Durasi: *${info.lengthSeconds}*
➭ Reso: *${resAudio.audioQuality}*`;
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: teks });
            console.log("Success download youtube audio:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                size: `${fileSize.toFixed(2)}MB`,
                youtube_url: url,
                cdn_youtube: resAudio.url
            }, null, 2));
        } catch(error) {
            console.log("Error at ytmp3: \n" + error);
            m.reply(zn.emoji("failed") + "︱Terjadi kesalahan saat memproses command!");
            return;
        }
    }
}