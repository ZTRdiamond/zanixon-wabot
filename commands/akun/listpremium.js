module.exports = {
    name: "listpremium",
    alias: ["listprem"],
    type: "akun",
    details: {
        desc: "Menampilkan list pengguna premium",
        usage: "Contoh: *%prefix%command 10|1*"
    },
    code: async(zanixon, m, { zn, text, sender }) => {
        let teks = text.split("|");
        let count = teks[0] ? teks[0] : 10;
        let page = teks[1] ? teks[1] : 1;
        let leaderboard = zn.leaderboard("default", null, "premiumDuration", false, null, `{rank}︱{name}・{value}`, count, page, true).replaceAll("@c.us", "");
        let lb = `*List premium:*
${leaderboard}`;
        m.reply(lb);
    }
}