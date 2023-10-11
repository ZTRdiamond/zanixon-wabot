const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "waifunsfw",
    details: {
        desc: "Send random nsfw waifu image"
    },
    type: "nsfw",
    isPremium: true,
    isNsfw: true,
    code: async(zanixon, m, { axios, zn, text }) => {
        try {
            let nekos;
            const res = await axios.get('https://api.waifu.pics/nsfw/waifu');
            nekos = res.data.url;
            let media = await MessageMedia.fromUrl(nekos)
            m.reply(media, null, { caption:'Ini waifu sus nya kak!' });
        } catch (error) {
            console.error('Error at get waifu nsfw image: ' + error);
            m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar neko!`);
        }
    }
}