const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")
const { MessageMedia } = require("whatsapp-web.js")
const { webp2mp4File } = require("../../lib/Converter")
const { getRandom } = require("../../lib/Function")
const dir = path.join(process.cwd(), `./tmp/undefined.jpg`)

module.exports = {
    name: "toimage",
    aliases:["toimg"],
    desc: "Convert sticker to Image",
    type: "convert",
    code: async(zanixon, m, { zn, mime, quoted, sender }) => {
        if (quoted.type == 'sticker') {
            let media = await quoted.downloadMedia();
            zanixon.sendMessage(m.id.remote, media, { caption: `Sticker to Image`, quotedMessageId: m.id._serialized })
        } else {
            zanixon.sendMessage(m.id.remote, `${zn.emoji("alert")}│Media bukan sticker!`, { quotedMessageId: m.id._serialized })
        }
    }
}