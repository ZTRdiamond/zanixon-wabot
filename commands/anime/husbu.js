const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

module.exports = {
    name: "husbu",
    details: { 
        desc: "Send random husbu image"
    },
    type: "anime",
    code: async(zanixon, m, { utils }) => {
        try {
           const response = await axios.get('https://ztrdiamond.github.io/free-json-data/anime/husbu.json');
           let husbu = response.data[utils.random(0, response.data.length)].url;
           let media = await MessageMedia.fromUrl(husbu);
           m.reply(media, null, { caption:'Ini husbu nya kak!'});
        } catch (error) {
            console.error('Error at get husbu image: ' + error);
            m.reply('Gagal mengirim gambar husbu!');
        }
    }
}