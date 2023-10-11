const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
   name: "pinterest",
   alias: ["pins","pin"],
   type: "searcher",
   code: async(zanixon, m, { text, axios, sender, zn }) => {
      if(!text) {
         m.reply(zn.emoji("alert") + "Mana query nya, apa yang mau kamu cari?");
         return;
      }
      try {
         const res = await axios.get(`https://ztrdiamond-pins-searcher.cyclic.cloud/?keyword=${text}`);
         const data = res.data;
         if(data.result === undefined) {
             m.reply(zn.emoji("failed") + `Data dengan keyword pencarian *"${text}"* tidak ditemukan!`);
             return;
         }
         let content = data.result[Math.floor(Math.random() * data.result.length)];
         let url = content.image;
         let title = content.title;
         let post = content.url;
         
         let media = await MessageMedia.fromUrl(url, { unsafeMime: true });
         let msg = `*Pinterest image search:*
➭ Title: *${title}*
➭ Post: *${post}*
➭ Image: *${url}*
`;
         m.reply(media, null, { caption: msg });
      } catch(err) {
         console.log("Error at pinterest.js: ", err);
         return err;
      }
   }
}