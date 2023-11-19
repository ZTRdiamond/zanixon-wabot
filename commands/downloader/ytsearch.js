module.exports = {
    name: "ytsearch",
    aliases: ["yts"],
    type: "downloader",
    details: {
        desc: "Search YouTube video quickly",
        usage: "%prefix%command himawari no yakusoku|5"
    },
    code: async(zanixon, m, { zn, text, downloader, isPremium }) => {
        let split = text.split("|");
        let query = split[0];
        let amount = split[1] || 5;
        if(!isPremium && amount > 5) return m.reply(zn.emoji("alert") + `︱Menampilkan hasil lebih dari 5 pencarian hanya untuk pengguna *Premium*!`);
        m.reply(zn.emoji("wait") + `︱Tunggu sebentar, permintaan sedang diproses!`);
        try {
            const res = await downloader.yts(query);
            zanixon.sendMessage("19282571929@c.us", res);
            if(!res.status) return m.reply(zn.emoji("failed") + `︱Gagal mendapatkan data, pastikan query sudah benar!`);
            const data = res.data.slice(0, amount);
            let list = "";
            let c = 1;
            data.forEach((v) => {
                list += `*#${c++} - ${v.title}*\n➭ Url: *${v.url}*\n\n`;
            });
            m.reply(`YouTube Search: *${query}*

${list}`)
        } catch (e) {
            console.log("Error at ytsearch.js:", e);
            m.reply(zn.emoji("failed") + `︱Gagal mendapatkan data, silahkan coba lagi nanti!`);
        }
    }
}