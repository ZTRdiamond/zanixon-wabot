module.exports = {
    name: "topuser",
    aliases: ["toprequest", "topreq"],
    type: "main",
    code: async(zanixon, m, { zn, text, sender }) => {
        let teks = text.split("|");
        let count = teks[0] ? teks[0] : 10;
        let page = teks[1] ? teks[1] : 1;
        let leaderboardPosition = `${zn.leaderboardPosition("default", sender, null, "totalRequest", true, null, `{rank}︱{name}・{value} request`, true)}`.replace("@c.us", "");
        let leaderboard = zn.leaderboard("default", null, "totalRequest", true, null, `{rank}︱{name}・{value} request`, count, page, true).replaceAll("@c.us", "");
        let lb = `*⬤⚍⚍❰ Top Request User ❱⚍⚍⬤*
Menampilkan user yang aktif dalam menggunakan bot, angka yang tampil adalah jumlah command yang telah di panggil oleh user.

*Your position:*
${leaderboardPosition}

*Leaderboard:*
${leaderboard}`;
        m.reply(lb);
    }
}