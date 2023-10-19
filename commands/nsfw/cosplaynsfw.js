const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "cosplaynsfw",
    aliases: ["cosernsfw"],
    isPremium: true,
    type: "nsfw",
    isNsfw: true,
    details: {
        desc: "Send random nsfw cosplay image"
    },
    code: async(zanixon, m, { zn, sender, axios, utils }) => {
        try {
          const res = await axios.get('https://ztrdiamond.github.io/free-json-data/18/cosplay18.json');
          const coser = res.data[utils.random(1, 269)];
          /*const media = await MessageMedia.fromUrl(coser.url, { unsafeMime: true });
          m.reply(media, null, { caption: 'Ini foto cosplay nya kak!' });*/
          m.reply(`Ini foto cosplay sus nya kak!\n${coser.url}`);
        } catch (error) {
          console.error('Error at get cosplay nsfw image: ' + error);
          m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar cosplay!`);
        }
    }
}