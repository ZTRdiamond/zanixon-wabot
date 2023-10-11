const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "loli",
    details: {
        desc: "Send random loli image"
    },
    type: "anime",
    code: async(zanixon, m, { axios, zn, text }) => {
       try {
           let loli;
           const response = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon');
           loli = response.data.data[0];
           let media = await MessageMedia.fromUrl(loli.urls.original)
           m.reply(media, null, { caption:'Ini loli nya kak!'});
        } catch (error) {
            console.error('Error at get loli image: ' + error);
           m.reply(`${zn.emoji('failed')}│Gagal mengirim gambar loli!`);
        }
    }
}