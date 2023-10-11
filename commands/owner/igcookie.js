module.exports = {
    name: "igcookie",
    type: "owner",
    isOwner: true,
    details: {
        desc: "Set new cookie for IG downloader",
        usage: "%prefix%command user|pass"
    },
    code: async(zanixon, m, { zn, text }) => {
        const { getCookie } = require("insta-fetcher");
        let teks = text.split("|");
        if(teks[0] == "" && teks[1] == "") {
            return m.reply(zn.emoji("alert") + "︱Mana username sama password IG nya?");
        }
        try {
            let cookie = await getCookie(teks[0], teks[1]);
            if(cookie == undefined) {
                return m.reply(zn.emoji("failed") + `︱Gagal mengatur cookie baru untuk IG downloader!\n\nResult: ${cookie}`);
            }
            zn.set("igCookie", cookie, null, "config", true);
            m.reply("*Cookie:* " + cookie);
        } catch(error) {
            m.reply(zn.emoji("failed") + `︱Gagal mengatur cookie baru untuk IG downloader!\n\nResult: ${error}`);
        }
    }
}