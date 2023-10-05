module.exports = {
    name: "howgay",
    desc: "Menghitung seberapa gay user",
    type: "fun",
    example: "*Example:* %prefix%command @user",
    code: async(zanixon, m, { zn, text }) => {
        //persen 
        const totalNum = `${Math.floor(Math.random() * 100) +1}`;
        function emojiNum(num) {
           if (num >= 0 && num < 5) {
              return "😁";
           } else if (num >= 5 && num < 20) {
              return "🙂";
           } else if (num >= 20 && num < 40) {
              return "😐";
           } else if (num >= 40 && num < 60) {
              return "😑";
           } else if (num >= 60 && num < 80) {
              return "🤨";
           } else if (num >= 80 && num <= 100) {
              return "💀";
           } else {
              return "💀";
           }
        }
        //teks
        const teks = text.replaceAll("@", "wa.me/");
        //reply 
        if(teks) {
            m.reply(`*Howgay ${teks}*
*${teks}* is ${totalNum}% gay${emojiNum(totalNum)}`)
        } else {
            m.reply(`${zn.emoji("alert")}│Tag nomor, berikan nama atau teks nya!`)
        }
    }
}