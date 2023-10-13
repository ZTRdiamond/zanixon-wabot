const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "lahelu",
    alias: ["laheludl"],
    type: "downloader",
    disable: true,
    details: {
        desc: "Download postingan lahelu.com",
        usage: "%prefix%command tipe? (image, video)|link"
    },
    isOwner: true,
    code: async(zanixon, m, { zn, text, sender, axios, usage }) => {
        let teks = text.split("|");
        
        async function lahelu(url, type) {
            const regex = /^https:\/\/lahelu\.com\/post\//;
            if (!regex.test(url)) {
                return "Invalid url!";
            }
            let image = url.replace("//lahelu", "//cache.lahelu").replace("post/", "image-");
            let video = url.replace("//lahelu", "//cache.lahelu").replace("post/", "video-");
            try {
                if(type == "video" || type == "mp4" || type == "vid") {
                    let final = {status: 200, type: "video", url: video};
                    return final;
               } else if(type == "image" || type == "img") {
                    let final = {status: 200, type: "image", url: image};
                    return final;
               } else {
                    return {status: 400, type: undefined, url: undefined};
               }
            } catch (error) {
                console.log("Error at lahelu downloader function:", error);
                return undefined;
            }
        }
        
        if(teks == "") return m.reply(zn.emoji("alert") + `︱Penggunaan salah!\nContoh: *${usage}*`);
        const regex = /\b(image|img|video|vid|mp4)\b/gi;
        if(teks[0].match(regex) == false) return m.reply(zn.emoji("alert") + "︱Tipe media tidak valid!");
        const regexUrl = /^https:\/\/lahelu\.com\/post\//;
        if(regexUrl.test(teks[1]) == false) return m.reply(zn.emoji("alert") + "︱Url tidak ada!");
        
        m.reply(zn.emoji("wait") + "︱Tunggu sebentar, perimntaan sedang diproses!");
        let url;
        let dat;
        try {
            const ext = teks[0].replace(regex, match => {
                return match.toLowerCase() === 'image' || match.toLowerCase() === 'img' ? 'jpg' : 'mp4';
            });
            let data = await lahelu(teks[1], teks[0]);
            url = data.url;
            dat = data;
            let media = await MessageMedia.fromUrl(data.url, { unsafeMime: true, filename: `lahelu-downloader-zanixonmd.${ext}` });
            m.reply(media, null, { caption: `*Lahelu Downloader:*
➭ Post: *${teks[1]}*
➭ MediaUrl: *${url}*` });
            console.log("Success download lahelu media:", data);
        } catch (err) {
            console.log("Lahelu url:", dat);
            console.log("Error at lahelu.js:", err);
            m.reply(zn.emoji("failed") + `︱Gagal mendownload media! \n\nSilahkan download manual dibawah ini\nUrl: *${url}*`);
        }
    }
}