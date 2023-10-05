const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "neko",
    desc: "Send random neko image",
    type: "random",
    code: async(zanixon, m, { axios, zn, text }) => {
        if(text == 'nsfw') {
            if(m.id.remote == "120363162762063560@g.us") {
                m.reply(zn.emoji("warn") + "︱Command ini tidak dapat digunakan di grup ini!");
                return;
            }
            try {
                let nekos;
                const res = await axios.get('https://api.waifu.pics/nsfw/neko');
                nekos = res.data.url;
                let media = await MessageMedia.fromUrl(nekos)
                m.reply(media, null, { caption:'Ini neko sus nya kak!' });
            } catch (error) {
                console.error('Error at get neko image: ' + error);
                m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar neko!`);
            }
        } else {
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
}