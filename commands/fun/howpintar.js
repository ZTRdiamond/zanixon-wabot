module.exports = {
    name: "howpintar",
    desc: "Mengukur kepintaran",
    example: "Example: %prefix%command ( @user/nama )",
    type: "fun",
    code: async(zanixon, m, { zn, utils, text, listMentions }) => {
        if(text) {
        	m.reply(`*Howpintar:* ${text.replaceAll("@", "wa.me/")}\n*${text.replaceAll("@", "wa.me/")}* is *${utils.random(1, 100)}%* pintar🧠`);
        } else {
        	m.reply(zn.emoji("alert") + "︱Tag atau berikan nama teman atau siapapun");
        }
    }
}