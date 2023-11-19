module.exports = {
    name: "debug",
    aliases: ["debugging"],
    type: "debug",
    isOwner: true,
    code: async(zanixon, m, { sender, text, quoted, utils, MessageMedia, axios }) => {
        const fs = require("fs");
        let type = quoted.type;
        if(type == "image") {
            let media = await quoted.downloadMedia();
            let tmp = await utils.saveMedia(media.data);
            let pomf = await utils.pomf(tmp.path);
            m.reply(tmp + " " + pomf)
        } else {
            m.reply("apalahh");
        }
    }
}