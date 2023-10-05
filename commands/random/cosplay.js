const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
  name: "cosplay",
  desc: "Send random cosplay image",
  type: "random",
  code: async (zanixon, m, { utils, axios, zn, text }) => {
    if(m.id.remote == "120363162762063560@g.us") {
        m.reply(zn.emoji("warn") + "︱Command ini tidak dapat digunakan di grup ini!");
        return;
    }
    if (text === 'nsfw') {
      try {
        const res = await axios.get('https://ztrdiamond.github.io/free-json-data/18/cosplay18.json');
        const coser = res.data[utils.random(1, 269)];
        const media = await MessageMedia.fromUrl(coser.url, { unsafeMime: true });
        m.reply(media, null, { caption: 'Ini foto cosplay nya kak!' });
      } catch (error) {
        console.error('Error at get cosplay image: ' + error);
        m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar cosplay!`);
      }
    } else {
      try {
        const res = await axios.get('https://ztrdiamond.github.io/free-json-data/cosplay/cosplay.json');
        const coser = res.data[utils.random(1, 269)];
        const media = await MessageMedia.fromUrl(coser.url, { unsafeMime: true });
        m.reply(media, null, { caption: 'Ini foto cosplay nya kak!' });
      } catch (error) {
        console.error('Error at get cosplay image: ' + error);
        m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar cosplay!`);
      }
    }
  }
};
