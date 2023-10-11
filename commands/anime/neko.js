const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "neko",
    details: {
        desc: "Send random neko image"
    },
    type: "anime",
    code: async(zanixon, m, { axios, zn, text }) => {
         try {
             let neko;
             const response = await axios.get('https://api.waifu.pics/sfw/neko');
             neko = response.data.url;
             let media = await MessageMedia.fromUrl(neko)
             m.reply(media, null, { caption:'Ini neko nya kak!'});
        } catch (error) {
             console.error('Error at get neko image: ' + error);
             m.reply(`${zn.emoji('failed')}│Gagal mengirim gambar neko!`);
        }
    }
}