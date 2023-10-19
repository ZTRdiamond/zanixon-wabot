module.exports = {
  name: "stickerwm",
  aliases: ["stikerwm", "setikerwm", "sgifwm", "swm", "wm"],
  desc: "Convert Image or Video To Sticker",
  example: "Example: %prefix%command packname? | author?",
  type: "convert",
  isOwner: false,
  code: async (zanixon, m, { zn, mime, quoted, text, sender, readmore }) => {
    try {
      const qType = quoted.type;
      const mType = m.type;
      let teks = text.split("|");
      //teks[0] = teks[0].substring(teks[0].indexOf(" ") + 1);

      if (qType == "image" || qType == "video" || qType == "gif" || qType == "sticker" || qType == "document") {
        let encmedia = await quoted.downloadMedia();
        zanixon.sendMessage(m.id.remote, encmedia, { quotedMessageId: m.id._serialized, sendMediaAsSticker: true, stickerName: teks[0], stickerAuthor: teks[1], stickerCategories: ["🐱", "😾", "😼"] });
      } else if (mType == "image" || mType == "video" || mType == "gif" || mType == "document") {
        let encmedia = await quoted.downloadMedia();
        zanixon.sendMessage(m.id.remote, encmedia, { quotedMessageId: m.id._serialized, sendMediaAsSticker: true, stickerName: teks[0] || "", stickerAuthor: teks[1] || "", stickerCategories: ["🐱", "😾", "😼"] });
      } else {
        m.reply(`${zn.emoji('alert')}│Kirim gambar dengan caption *.stickerwm packname|author* atau balas gambar dengan *.stickerwm packname|author* untuk membuat sticker dengan custom wm!`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
