const { MessageMedia } = require("whatsapp-web.js");
                                 
module.exports = {
    name: "lolinsfw",
    type: "nsfw",
    isPremium: true,
    isNsfw: true,
    details: {
        desc: "Send random nsfw loli images"
    },
    code: async(zanixon, m, { zn, utils, axios }) => {
        try {
             let lolis;
             const res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=1&tag=lolicon');
             lolis = res.data.data[0];
             let media = await MessageMedia.fromUrl(lolis.urls.original)
             m.reply(media, null, { caption:'Ini loli sus nya kak!' });
        } catch (error) {
             console.error('Error at get loli nsfw image: ' + error);
             m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar loli!`);
        }
    }
}