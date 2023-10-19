module.exports = {
  name: "sticker",
  aliases: ["stikerr", "setiker", "sgif", "s", "stiker"],
  desc: "Convert Image or Video To Sticker",
  type: "convert",
  isOwner: false,
  code: async (zanixon, m, { zn, mime, quoted, readmore }) => {
    try {
      const qType = quoted.type;
      const mType = m.type;
      if (qType == "sticker" || qType == "image" || qType == "video" || qType == "gif" || qType == "document") {
        let encmedia = await quoted.downloadMedia();
        zanixon.sendMessage(m.id.remote, encmedia, { quotedMessageId: m.id._serialized, sendMediaAsSticker: true, stickerName: global.packname, stickerAuthor: global.author, stickerCategories: ["🐱", "😾", "😼"] });
      } else if (mType == 'sticker' || mType == "image" || mType == "video" || mType == "gif" || mType == "document") {
        let encmedia = await quoted.downloadMedia();
        zanixon.sendMessage(m.id.remote, encmedia, { quotedMessageId: m.id._serialized, sendMediaAsSticker: true, stickerName: global.packname, stickerAuthor: global.author, stickerCategories: ["🐱", "😾", "😼"] });
      } else {
        m.reply(`${zn.emoji('alert')}│Kirim gambar dengan caption *.sticker* atau balas gambar dengan *.sticker* untuk membuat sticker!`);
      }
    } catch (error) {
      console.error(error);
      /* m.reply(`${zn.emoji("alert")}│Terjadi kesalahan saat mencoba membuat sticker\n${readmore}\n
*Error:* ${error}`); */
    }
  }
}
