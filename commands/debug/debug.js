module.exports = {
    name: "debug",
    alias: ["debugging"],
    type: "debug",
    isOwner: true,
    isLimit: true,
    isPremium: true,
    code: async(zanixon, m, { sender, text }) => {
        m.reply("*Pesan kamu:* " + text);
    }
}