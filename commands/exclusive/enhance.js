const fs = require("fs");

module.exports = {
    name: "tohd",
    aliases: ["hd","enhance","remini"],
    type: "exclusive",
    isLimit: false,
    cooldown: {
        duration: 30,
        msg: "︱Tunggu *{sec} detik* untuk memanggil perintah ini lagi!",
        emoji: "wait"
    },
    details: {
        desc: "Menjernihkan gambar",
        usage: "%prefix%command"
    },
    code: async(zanixon, m, { zn, quoted, utils, axios, MessageMedia, fetchBuffer, fs }) => {
        let type = quoted.type;
        m.reply(zn.emoji("wait") + `︱Tunggu sebentar, permintaan sedang diproses!`);
        try {
            if(type == "image") {
                const media = await quoted.downloadMedia();
                let tmp = await utils.saveMedia(media);
                let pomf = await utils.pomf(tmp.path);
                let buff = await fetchBuffer(`https://vihangayt.me/tools/enhance?url=${pomf.url}`);
                let tmp2 = await utils.saveMedia(null, buff.toString("base64"));
                //console.log("Tmp1:" + tmp, "Pomf:" + pomf, "Tmp2:" + tmp2);
                let pomf2 = await utils.pomf(tmp2.path);
                console.log("Enhance final:", pomf2)
                let hd = await MessageMedia.fromUrl(pomf2.url, { unsafeMime: true, filename: `ZanixonMD-Photo-Enhancer.jpg` });
                zanixon.sendMessage(m.id.remote, hd, { quotedMessageId: m.id._serialized, caption: `*Photo enhancer:*
➭ Before: *${pomf.url}*
➭ After: *${pomf2.url}*`, sendMediaAsDocument: true });
                fs.unlinkSync(tmp.path);
                fs.unlinkSync(tmp2.path);
            } else {
                m.reply(zn.emoji("failed") + `︱Gagal menjernihkan foto, media yang diberikan bukan gambar!`);
            }
        } catch(err) {
            m.reply(zn.emoji("failed") + `︱Gagal menjernihkan foto, silahkan coba lagi nanti!`);
            console.log("Error at enhance.js:", err);
        }
    }
}