const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "tiktokmp3",
    aliases: ["tta", "tiktoka", "tiktokaudio", "ttaudio","ttmp3"],
    type: "downloader",
    details: {
        desc: "Download video tiktok tanpa watermark",
        usage: "%prefix%command https://vm.tiktok.com/ZMjDmLgCT/"
    },
    code: async (zanixon, m, { downloader, zn, text, readmore, sender }) => {
        const url = text;
        if (url.length === 0) {
            m.reply(zn.emoji("alert") + "│Mana link video tiktok nya?");
            return;
        }
        m.reply("⏱️︱Tunggu sebentar, permintaan sedang di proses!");

        try {
            const res = await downloader.ttdl(url);
            let data = res.data;
            if (res.status === false) {
                m.reply(zn.emoji("failed") + "︱Gagal mendownload audio tiktok, pastikan url/link tiktok sudah benar!");
                return;
            }
            let media = await MessageMedia.fromUrl(data.music[0], { unsafeMime: true, filename: `${data.description}.mp3` });
            
            let teks = `*Post info:*
➭ View: *${zn.abbreviate(data.statistics.playCount, '0.00a')}*
➭ Like: *${zn.abbreviate(data.statistics.likeCount, '0.00a')}*
➭ Comment: *${zn.abbreviate(data.statistics.commentCount, '0.00a')}*
➭ Favorite: *${zn.abbreviate(data.statistics.favoriteCount, '0.00a')}*
➭ Share: *${zn.abbreviate(data.statistics.shareCount, '0.00a')}*
➭ Download: *${data.statistics.downloadCount}*
`;
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: teks });
            console.log("Success download tiktok audio:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                tiktok_url: url,
                cdn_tiktok: data.music[0]
            }, null, 2));
        } catch (error) {
            console.log(error);
            m.reply(zn.emoji('alert') + '︱Terjadi kesalahan saat memproses command!');
        }
    }
}
