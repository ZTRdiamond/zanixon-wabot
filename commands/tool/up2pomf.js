module.exports = {
    name: "up2pomf",
    aliases: ["tourlpomf","pomf"],
    type: "tool",
    details: {
        desc: "Upload media to pomf.lain.la",
        usage: "%prefix%command"
    },
    cooldown: {
        duration: 60
    },
    code: async(zanixon, m, { zn, utils, quoted, isQuoted, fs }) => {
      try {
         if (isQuoted) {
            let media = await quoted.downloadMedia();
            let tmp = await utils.saveMedia(media.data, media.mimetype);
            let res = await utils.pomf(tmp.path);
            m.reply(zn.emoji("success") + `︱Berhasil mengupload media!

*Details:*
➭ Url: *${res.url}*
➭ FileSize: *${utils.formatBytes(media.filesize || 0)}*`);
             fs.unlinkSync(tmp.path);
         } else {
            let media = await m.downloadMedia();
            let tmp = await utils.saveMedia(media.data, media.mimetype);
            let res = await utils.pomf(tmp.path);
            m.reply(zn.emoji("success") + `︱Berhasil mengupload media!

*Details:*
➭ Url: *${res.url}*
➭ FileSize: *${utils.formatBytes(media.filesize || 0)}*`);
             fs.unlinkSync(tmp.path);
         }
      } catch (e) {
         m.reply(zn.emoji("failed") + "︱Gagal mengupload media!");
         console.log("Error at up2pomf.js:", e);
      }
   }
}