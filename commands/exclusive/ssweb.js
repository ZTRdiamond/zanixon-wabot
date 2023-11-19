const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "ssweb",
    aliases: ["ssw","screenshotweb", "screenshotw"],
    type: "exclusive",
    details: {
        desc: "Mengambil tangkapan layar website",
        usage: "%prefix%command https://trakteer.id/zanixongroup|pc"
    },
    code: async(zanixon, m, { downloader, zn, text, details, utils }) => {
        const args = text.split("|");
        const url = args[0];
        const sstype = args[1] ? args[1] : "pc";
        
        if(url == "") return m.reply(zn.emoji("alert") + `︱Mana url website nya?\nContoh: *${details.usage}*\nOptions: *pc, hp, tab*`);
        try {
            m.reply(zn.emoji("wait") + "︱Tunggu sebentar, permintaan sedang diproses!");
            if(sstype === "pc") {
                const ss = await MessageMedia.fromUrl(`https://vihangayt.me/tools/ssweb?url=${url}`, { unsafeMime: true });
                m.reply(ss, null, { caption: "Ini screenshot  web nya!" });
                return;
            } else if(sstype === "hp") {
                const ss = await MessageMedia.fromUrl(`https://vihangayt.me/tools/ssphone?url=${url}`, { unsafeMime: true });
                m.reply(ss, null, { caption: "Ini screenshot  web nya!" });
                return;
            } else if(sstype === "tab") {
                const ss = await MessageMedia.fromUrl(`https://vihangayt.me/tools/sstab?url=${url}`, { unsafeMime: true });
                m.reply(ss, null, { caption: "Ini screenshot  web nya!" });
                return;
            } else {
                m.reply(zn.emoji("alert") + `︱Opsi tersebut tidak ada!\nContoh: *${details.usage}*\nOptions: *pc, hp, tab*`);
                return
            }
        } catch(err) {
            console.log("Error at ssweb: \n" + err);
            m.reply(zn.emoji("failed") + "︱Gagal mengambil screenshot!");
            return;
        }
    }
}