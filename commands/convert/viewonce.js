const { MessageMedia } = require("whatsapp-web.js")

module.exports = {
    name: "readviewonce",
    aliases: ["viewonce","vo","svo","reup","rvo","reupload"],
    desc: "Mengirim ulang gambar dari pesan view once whatsapp",
    example: "Balas pesan view once dengan *.viewonce*",
    type: "convert",
    code: async(zanixon, m, { zn, quoted, remote, isQuoted }) => {
    try {
        const isMedia = quoted.hasMedia;
        if(isQuoted == false) {
            m.reply(`${zn.emoji("alert")}│Balas pesan *View Once* yang akan di kirim ulang media nya.`);
            return;
        }
        if(quoted.hasViewOnce == false) {
            m.reply(`${zn.emoji("alert")}│Pesan yang kamu balas bukan pesan *View Once*.`);
            return;
        }
        if(isMedia == true) {
            let media = await quoted.downloadMedia();
            zanixon.sendMessage(m.from, media, { caption: `┏━━❰ *Caption dari gambar* ❱━━ꕥ\n` + quoted.body ? quoted.body : '', quotedMessageId: m.id._serialized })
        } else {
            m.reply(`${zn.emoji("alert")}│Pesan yang di balas terdeteksi bukan media!`);
        }
       } catch(error) {
           console.log("Error at read view once command: " + error)
           m.reply(zn.emoji("alert") + "│Terjadi error saat memproses command...")
       }
    }
}