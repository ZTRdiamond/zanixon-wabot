module.exports = {
    name: "ai",
    aliases: ["gpt","chatgpt","aigpt"],
    type: "exclusive",
    isPremium: true,
    code: async(zanixon, m, { zn, axios, sender, text }) => {
        let cooldown = zn.getCooldown("ai_" + sender, "{sec} detik") || { id: `ai_${sender}`, status: false, duration: 30, timestamp: 0, time: "0 detik" };
        if(cooldown === undefined || cooldown.status === false) {
            zn.setCooldown("ai_" + sender, 30);
            console.log(`[System] cooldown 30 second for AI was added to ${sender.replace("@c.us", "")}`);
        }
        if(cooldown.status === true) {
            m.reply(zn.emoji("wait") + `︱Tunggu *${cooldown.time}* untuk melakukan request *AI* lagi!`);
            return;
        }
        if(!text) {
            m.reply(zn.emoji("alert") + "︱Mana pertanyaan nya? \nContoh: *.ai jelaskan tentang luar angkasa*");
            return;
        }
        m.reply(zn.emoji("wait") + "︱Tunggu sebentar, permintaan sedang diproses!");
        
        try {
            let url = `https://vihangayt.me/tools/chatgpt4?q=${text}`;
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