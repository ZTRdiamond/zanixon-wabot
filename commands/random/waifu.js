const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "waifu",
    desc: "Send random waifu image",
    type: "random",
    code: async(zanixon, m, { axios, zn, text }) => {
        const { ZeroChan } = require("zerochan-scraper-ts");
        const zc = new ZeroChan("zanixon", "ZTRdiamond");
        async function getImage(keyword, page) {
            page = page ? page : 1;
            try {
                let data = await zc.getImage(keyword, page);
                let random = Math.floor(Math.random() * 100) + 1;
                let res = data[random];
                const id = res.id;
                const query = keyword.replace(/\s+/g, '.');
                const url = `https://static.zerochan.net/${query}.600.${id}.jpg`;
                if(res) {
                    return { error: "none", url: url };
                } else {
                    return { error: "Can't find content", url: "" };
                }
            } catch(err) {
                console.log("Error at waifu zerochan: ", err);
                return { error: err, url: "" };
            }
        }
        
        if(text === 'nsfw') {
            if(m.id.remote == "120363162762063560@g.us") {
                m.reply(zn.emoji("warn") + "︱Command ini tidak dapat digunakan di grup ini!");
                return;
            }
            try {
                let waifus;
                const res = await axios.get('https://api.waifu.pics/nsfw/waifu');
                waifus = res.data.url;
                let media = await MessageMedia.fromUrl(waifus)
                m.reply(media, null, { caption:'Ini waifu sus nya kak!' });
            } catch (error) {
                console.error('Error at get waifu image: ' + error);
                m.reply(`${zn.emoji("failed")}│Gagal mengirim gambar waifu!`);
            }
        } else if(text) {
            let teks = text.split("|");
            try {
                const zerochan = await getImage(teks[0], teks[1]);
                let media = await MessageMedia.fromUrl(zerochan.url);
                m.reply(media, null, { caption: `*Pencarian waifu:*
Query: *${text}*
Url: *${zerochan.url}*` });
                return;
            } catch(err) {
                console.log("Error at waifu zerochan: ", err);
                m.reply(`Hasil dari pencarian waifu *"${text}"* tidak dapat ditemukan!`);
                return;
            }
        } else {
            try {
               let waifu;
               const response = await axios.get('https://api.waifu.pics/sfw/waifu');
               waifu = response.data.url;
               let media = await MessageMedia.fromUrl(waifu)
               m.reply(media, null, { caption:'Ini waifu nya kak!'});
            } catch (error) {
                console.error('Error at get waifu image: ' + error);
                m.reply(`${zn.emoji('failed')}│Gagal mengirim gambar waifu!`);
            }
        }
    }
}