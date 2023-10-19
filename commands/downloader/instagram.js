const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "instagram",
    aliases: ["ig","igdl","instagramdl"],
    type: "downloader",
    code: async(zanixon, m, { text, zn, sender }) => {
        const { igApi, getCookie } = require("insta-fetcher");
        let cookie = zn.get("igCookie", null, "config", true);
        const ig = new igApi(cookie);
        let urlpost = text;
        if(!urlpost) {
            m.reply(zn.emoji("alert") + "︱Mana url post instagram nya!\nContoh: *.ig https://www.instagram.com/p/Cs3SHq-hRkP*");
            return;
        }
        m.reply(zn.emoji("wait") + "︱Tunggu sebentar, permintaan sedang diproses!");
        try {
            let res = await ig.fetchPost(urlpost);
            if(res === undefined) {
                m.reply(zn.emoji("failed") + "︱Gagal mendownload media, mungkin data postingan tidak ada atau link tidak valid");
                return;
            }
            m.reply(`*Instagram Post Info:*
➭ Account: *${res.username} / ${res.name || "none"}*
➭ Likes: *${zn.abbreviate(res.likes, "0.00a")}*
➭ Comment: *${zn.abbreviate(res.comment_count, "0.00a")}*
➭ Caption: ${res.caption}`);
            let urlCount = res.media_count;
            let now = 0;
            async function igdl() {
                try {
                    if(now < urlCount) {
                        let data = res.links[now];
                        let url = data.url;
                        let teks = `*Instagram Media Info:*
➭ Media count: *${now + 1}/${res.media_count}*
➭ Type: *${data.type}*
➭ Dimension: *${data.dimensions.height}x${data.dimensions.width}*`;
                        let media = await MessageMedia.fromUrl(url, { unsafeMime: true, filename: `ZanixonMD-IGDL-Media_${now}` });
                        zanixon.sendMessage(m.id.remote, media, { quotedMessageId: m.id._serialized, caption: teks, sendMediaAsDocument: true });
                        now++;
                        setTimeout(igdl, 15000);
                    }
                } catch(err) {
                    console.log(`Error at ${__dirname}: ${err}`);
                }
            }
            igdl().catch(error => {
                console.log(`Error at ${__dirname}: ${err}`);
            })
            console.log("Success download instagram media:", JSON.stringify({
                user: sender,
                name: m._data.notifyName,
                instagram_url: urlpost,
                cdn_instagram: res.links
            }, null, 2));
        } catch(err) {
            console.log("Error at instagram.js: ", err);
            m.reply(zn.emoji("failed") + `︱Terjadi suatu kesalahan pada sistem saat memproses permintaan`);
            
        }
    }
}