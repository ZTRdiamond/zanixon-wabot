const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "loli",
    desc: "Send random loli image",
    type: "random",
    code: async(zanixon, m, { axios, zn, text }) => {
        if(m.id.remote == "120363162762063560@g.us") {
            m.reply(zn.emoji("warn") + "︱Command ini tidak dapat digunakan di grup ini!");
            return;
        }
        
        if(text == 'nsfw') {
            try {
                let lolis;
                const res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=1&tag=lolicon');
                lolis = res.data.data[0];
                let media = await MessageMedia.fromUrl(lolis.urls.original)
                m.reply(media, null, { caption:'Ini loli sus nya kak!' });
            } catch (error) {
                console.error('Error at get loli image: ' + error);
                m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar loli!`);
            }
        } else {
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
}