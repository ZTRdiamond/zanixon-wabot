const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
   name: "pixiv",
   type: "search",
   details: {
       desc: "Search some image on pixiv",
       usage: "%prefix%command nama_karakter|jumlah (Max 20)|nsfw? (0 = sfw, 1 = nsfw, 2 = random)|ai? (0 = noAi, 1 = Ai, 2 = random)"
   },
   code: async(zanixon, m, { text, sender, zn, axios }) => {
      // .pixiv query|count|nsfw: opt|ai: opt
      let teks = text.split("|");
      let query = teks[0] ? teks[0] : "anime";
      let count = teks[1] ? teks[1] : 1;
      let nsfw = teks[2] ? teks[2] : 0;
      let ai = teks[3] ? teks[3] : false;
      if (count > 10) {
         m.reply(zn.emoji("alert") + `︱Gagal melakukan request karna max mencari gambar adalah 10 saja!`);
         return;
      }
      m.reply(zn.emoji("wait") + `︱Tunggu sebentar, permintaan sedang diproses!`);
      try {
         if(teks[0] !== "") {
            let now = 0;
            let response = await axios.get(`https://api.lolicon.app/setu/v2?tag=${query}&num=${count}&r18=${nsfw}&excludeAi=${ai}&size=original&size=regular&size=small&size=thumb&size=mini&size=regular`);
            let countPost = response.data.data.length;
            if(countPost === undefined) {
               m.reply(zn.emoji("failed") + `︱Hasil dari pencarian *"${query}"* tidak ditemukan`);
               return;
            }
            async function pixiv() {
               if (now < countPost) {
                  console.log("~$ Pixiv Media ", now+ 1);
                  let data = response.data.data[now];
                  let media = await MessageMedia.fromUrl(data.urls.small || data.urls.regular || data.urls.original); // data.urls.mini || data.urls.thumb || data.urls.small || data.urls.regular || data.urls.original
               m.reply(media, null, { caption: `*Pixiv image searcher:*
➭ Title: *${data.title}*
➭ Author: *${data.author}*
➭ Uid: *${data.uid}*
➭ Pid: *${data.pid}*
➭ Scale: *width x${data.width} / height x${data.height}*
➭ Format: *${data.ext}*
➭ Url-HD: *${data.urls.original}*
➭ Tags: *${data.tags}*
` }); 
                  now++;
                  setTimeout(pixiv, 15000);
               }
            }
            pixiv();
         } else {
            let response = await axios.get(`https://api.lolicon.app/setu/v2?tag=${query}&num=1&r18=${nsfw}&excludeAi=${ai}&size=original&size=regular&size=small&size=thumb&size=mini&size=regular`);
            let data = response.data.data[0];
            if(!data) {
               m.reply(zn.emoji("failed") + `︱Hasil dari pencarian *"${query}"* tidak ditemukan`);
               return;
            }
            let media = await MessageMedia.fromUrl(data.urls.small || data.urls.regular || data.urls.original); // data.urls.mini || data.urls.thumb || data.urls.small || data.urls.regular || data.urls.original
            m.reply(media, null, { caption: `*Random pixiv image:*
➭ Title: *${data.title}*
➭ Author: *${data.author}*
➭ Uid: *${data.uid}*
➭ Pid: *${data.pid}*
➭ Scale: *width x${data.width} / height x${data.height}*
➭ Format: *${data.ext}*
➭ Url-HD: *${data.urls.original}*
➭ Tags: *${data.tags}*
` });
         }
      } catch (error) {
         console.error(`Error at pixiv.js command: `, error);
         m.reply(zn.emoji("failed") + "︱Terjadi kesalahan saat memproses command");
         return;
      }
   }
}