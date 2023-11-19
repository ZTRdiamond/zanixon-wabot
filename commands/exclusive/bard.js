module.exports = {
    name: "bard",
    aliases: ["bardai", "aibard"],
    type: "exclusive",
    isLimit: false,
    cooldown: {
        duration: 30,
        msg: "︱Tunggu *{sec} detik* untuk bertanya ke *Bard* lagi!",
        emoji: "wait"
    },
    details: {
        desc: "Bertanya sesuatu atau meminta bantuan ke AI Bard",
        usage: "%prefix%command bagaimana fotosintesis pada tumbuhan?"
    },
    code: async(zanixon, m, { bard, text, zn, details }) => {
        if(!text) return m.reply(zn.emoji("alert") + "︱Mana pertanyaan nya? \nContoh: " + `*${details.usage}*`);
        try {
            const res = await bard(`tolong gunakan bahasa indonesia, ${text}`);
            let answer = `${res.data.answer}`.replaceAll(`**`, `*`);
            let msg = `*Pertanyaan:* ${text}

*Jawaban:* ${answer}`;
            m.reply(msg);
        } catch(err) {
            m.reply(zn.emoji("failed") + `︱Gagal mendapatkan jawaban dari *Bard*, silahkan coba lagi nanti!`);
            console.log("Error at bard.js:", err);
        }
    }
}