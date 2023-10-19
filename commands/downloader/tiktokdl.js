const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "tiktok",
    aliases: ["tiktokdl","tt","ttdl"],
    type: "downloader",
    details: {
        desc: "Download video tiktok tanpa watermark",
        usage: "%prefix%command https://vm.tiktok.com/ZMjDmLgCT/"
    },
    code: async(zanixon, m, { sender, zn, text, readmore }) => {
        const tiktok = require("@tobyg74/tiktok-api-dl");
        const url = text;
        if(url.length === 0) {
            m.reply(zn.emoji("alert") + "︱Mana link video tiktok nya? \n Contoh: *.tiktok https://vm.tiktok.com/ZMjDmLgCT/*");
            return;
        }
        try {
            const res = await tiktok.TiktokDL(url);
            let data = res.result;
            let type = data.type;
            if(data === undefined) {
                m.reply(zn.emoji("failed") + "︱Gagal mendapatkan media, mungkin url tidak valid!");
                return;
            }
            m.reply(zn.emoji("wait") + "︱Tunggu sebentar, permintaan serang diproses!");
            //let mediaCount = data.video.length || data.images.length;
            let caption = `*Info Akun:*
➭ Username: *${data.author.username}*
➭ Nickname: *${data.author.nickname}*
➭ From: *${data.author.region}*
➭ Bio: *${data.author.signature}*

*Info Postingan:*
➭ Type: *${type}*
➭ View: *${zn.abbreviate(data.statistics.playCount, '0.00a')}*
➭ Like: *${zn.abbreviate(data.statistics.likeCount, '0.00a')}*
➭ Comment: *${zn.abbreviate(data.statistics.commentCount, '0.00a')}*
➭ Favorite: *${zn.abbreviate(data.statistics.favoriteCount, '0.00a')}*
➭ Share: *${zn.abbreviate(data.statistics.shareCount, '0.00a')}*
➭ Download: *${data.statistics.downloadCount}*`; 
            //console.log(caption)
            if(type === "video") {
                m.reply(caption);
                let video = await MessageMedia.fromUrl(data.video[0], { unsafeMime: true, filename: `ZanixonMD-TIKTOKDL-Media.mp4` });
                zanixon.sendMessage(m.id.remote, video, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: `Ini video tiktok nya kak!` });
                console.log("Success download tiktok video:", JSON.stringify({
                    user: sender,
                    name: m._data.notifyName,
                    tiktok_url: text,
                    cdn_tiktok: data.video[0]
                }, null, 2));
            } else if (type === "image") {
                m.reply(caption);
                let now = 0;
                let count = data.images.length;
                
                async function tiktokSlide() {
                    if(now < count) {
                        let img = data.images[now];
                        let image = await MessageMedia.fromUrl(img, { unsafeMime: true, filename: `ZanixonMD-TIKTOKDL-Media_${now}.jpg` });
                        zanixon.sendMessage(m.id.remote, image, { quotedMessageId: m.id._serialized, caption: `Media: *${now + 1} / ${count}*` });
                        now++;
                    
                        setTimeout(tiktokSlide, 15000);
                    }
                }
                
                tiktokSlide();
                console.log("Success download tiktok slides:", JSON.stringify({
                    user: sender,
                    name: m._data.notifyName,
                    tiktok_url: text,
                    total_media: data.images.length,
                    cdn_tiktok: data.images
                }, null, 2));
            } else {
                m.reply(zn.emoji("failed") + "︱Gagal mengunduh media, mungkin data tidak ada atau url tidak valid!");
            }
        } catch (e) {
            m.reply(zn.emoji("error") + "︱Terjadi error saat memproses permintaan!");
            console.log("Error at tiktokdl.js:", e);
        }
    }
}