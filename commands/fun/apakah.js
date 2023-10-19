module.exports = {
    name: "apakah",
    type: "fun",
    details: {
        desc: "Mengembalikan jawaban iya, tidak, mungkin, mungkin iya, mungkin tidak, bisa jadi....",
        usage: "%prefix%command aku kaya?"
    },
    code: async(zanixon, m, { zn, parseMention, text }) => {
        //jawaban 
        const rawJawaban = ['Iya','Tidak','Mungkin','Mungkin iya','Mungkin tidak','Bisa jadi','Sangat mungkin','Tidak mungkin','Tidak akan'];
        const randIndex = Math.floor(Math.random() * rawJawaban.length);
        const jawab = rawJawaban[randIndex];
        //msg body 
        //const mentions = parseMention(text);
        const teks = text.replaceAll("@", "wa.me/");
        if(teks) {
            m.reply(`*Pertanyaan:* apakah ${teks}
*Jawaban:* ${jawab}`);
        } else {
            m.reply(`${zn.emoji("alert")}│Tolong berikan pertanyaan nya!`);
        }
    }
}