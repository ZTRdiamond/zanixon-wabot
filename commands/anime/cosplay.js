const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
  name: "cosplay",
  aliases: ["coser"],
  type: "anime",
  details: {
      desc: "Send random cosplay image"
  },
  code: async (zanixon, m, { utils, axios, zn, text }) => {
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
};
