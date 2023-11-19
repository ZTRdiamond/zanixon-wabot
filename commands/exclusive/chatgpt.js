module.exports = {
    name: "chatgpt",
    aliases: ["gpt","aigpt"],
    type: "exclusive",
    isPremium: true,
    cooldown: {
        duration: 30,
        msg: "︱Tunggu *{sec} detik* untuk melakukan request *ChatGPT* lagi!",
        emoji: "wait"
    },
    details: {
        desc: "Bertanya tentang sesuatu atau meminta bantuan ke ChatGPT",
        usage: "%prefix%command jelaskan tentang luar angkasa"
    },
    code: async(zanixon, m, { zn, axios, sender, text, details }) => {
        if(!text) {
            m.reply(zn.emoji("alert") + "︱Mana pertanyaan nya? \nContoh: " + `*${details.usage}*`);
            return;
        }
        m.reply(zn.emoji("wait") + "︱Tunggu sebentar, permintaan sedang diproses!");
        
        try {
            let url = `https://vihangayt.me/tools/chatgpt3?q=tolong+gunakan+bahasa+indonesia,+${text}`;
            let resgpt = await axios.get(url);
            let gpt = resgpt.data;
            let answer = `*Pertanyaan:* ${text}
*Jawaban:* 
${gpt.data}`;
            m.reply(answer);
        } catch(err) {
            m.reply(zn.emoji("failed") + "︱Gagal mendapatkan jawaban, silahkan coba lagi!");
            console.log("Error at ai.js:", err);
        }
    }
}