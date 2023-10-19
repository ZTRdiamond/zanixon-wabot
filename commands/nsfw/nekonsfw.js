const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "nekonsfw",
    details: {
        desc: "Send random nsfw neko image"
    },
    type: "nsfw",
    isPremium: true,
    isNsfw: true,
    code: async(zanixon, m, { axios, zn, text }) => {
        try {
            let nekos;
            const res = await axios.get('https://api.waifu.pics/nsfw/neko');
            nekos = res.data.url;
            /*let media = await MessageMedia.fromUrl(nekos)
            m.reply(media, null, { caption:'Ini neko sus nya kak!' });*/ 
            m.reply(`Ini neko sus nya kak!\n${nekos}`);
        } catch (error) {
            console.error('Error at get neko nsfw image: ' + error);
            m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar neko!`);
        }
    }
}