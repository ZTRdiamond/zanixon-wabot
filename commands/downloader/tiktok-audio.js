const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "tiktokmp3",
    aliases: ["tta", "tiktoka", "tiktokaudio", "ttaudio","ttmp3"],
    type: "downloader",
    details: {
        desc: "Download video tiktok tanpa watermark",
        usage: "%prefix%command https://vm.tiktok.com/ZMjDmLgCT/"
    },
    code: async (zanixon, m, { zn, text, readmore, sender }) => {
        const tiktok = require('@tobyg74/tiktok-api-dl');
        const url = text;
        if (url.length === 0) {
            m.reply(zn.emoji("alert") + "│Mana link video tiktok nya?");
            return;
        }
        m.reply("⏱️︱Tunggu sebentar, permintaan sedang di proses!");

        try {
            const data = await tiktok.TiktokDL(url);
            if (data.result === undefined) {
                m.reply(zn.emoji("failed") + "︱Video tiktok tidak ditemukan atau url tidak valid!");
                return;
            }
            let media = await MessageMedia.fromUrl(data.result.music[0], { unsafeMime: true, filename: `${data.result.description}.mp3` });
            
            let teks = `*Akun Info:*
➭ Username: *${data.result.author.username}*
➭ Nickname: *${data.result.author.nickname}*
➭ Region: *${data.result.author.region}*
➭ Bio: *${data.result.author.signature}*
${readmore}
*Video info:*
➭ View: *${zn.abbreviate(data.result.statistics.playCount, '0.00a')}*
➭ Like: *${zn.abbreviate(data.result.statistics.likeCount, '0.00a')}*
➭ Comment: *${zn.abbreviate(data.result.statistics.commentCount, '0.00a')}*
➭ Favorite: *${zn.abbreviate(data.result.statistics.favoriteCount, '0.00a')}*
➭ Share: *${zn.abbreviate(data.result.statistics.shareCount, '0.00a')}*
➭ Download: *${data.result.statistics.downloadCount}*
➭ Description: ${data.result.description}
`;
            zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, sendMediaAsDocument: true, caption: teks });
            console.log("Success download tiktok audio:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                tiktok_url: url,
                cdn_tiktok: data.result.music[0]
            }, null, 2));
        } catch (error) {
            console.log(error);
            m.reply(zn.emoji('alert') + '︱Terjadi kesalahan saat memproses command!');
        }
    }
}
