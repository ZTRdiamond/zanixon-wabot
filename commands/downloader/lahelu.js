const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "lahelu",
    alias: ["laheludl"],
    type: "akun",
    code: async(zanixon, m, { zn, text, sender, axios }) => {
        if(text === "") {
            m.reply(zn.emoji("alert") + "︱Mana link nya? \nContoh: *.lahelu https://lahelu.com/post/Pe32lQlUz*");
            return;
        }
        let original = text;
        
        async function lahelu(url) {
            const regex = /^https:\/\/lahelu\.com\/post\//;
            if (!regex.test(url)) {
                return "Invalid url!";
            }
            let image = url.replace("//lahelu", "//cache.lahelu").replace("post/", "image-");
            let video = url.replace("//lahelu", "//cache.lahelu").replace("post/", "video-");
            try {
                try {
                    const response = await axios.get(video, { responseType: "headers" });
                    const contentType = response.headers['content-type'];
                    let type = contentType.split("/")[0];
                    let finalType = type ? "video" : "image";
                    let final = JSON.stringify({
                        status: 200,
                        type: "video",
                        url: video
                    }, null, 2);
                    return final;
                  } catch (error) {
                    let final = JSON.stringify({
                        status: 200,
                        type: "image",
                        url: image
                    }, null, 2);
                    return final;
               }
            } catch (error) {
                console.log("Error at lahelu downloader function:", error);
                return undefined;
            }
        }
        
        m.reply(zn.emoji("wait") + "︱Tunggu sebentar, perimntaan sedang diproses!");
        let url;
        try {
            let data = await lahelu(original);
            url = data.url;
            let media = await MessageMedia.fromUrl(data.url, { unsafeMime: true });
            m.reply(media);
            console.log("Success download lahelu media:", data);
        } catch (err) {
            console.log("Error at lahelu.js:", err);
            m.reply(zn.emoji("failed") + `︱Gagal mendownload media! \n\nSilahkan download manual dibawah ini\nUrl: *${url}*`);
        }
    }
}