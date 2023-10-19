module.exports = {
    name: "tes",
    aliases: ["test"],
    type: "owner",
    code: async(zanixon, m, { prefix, text }) => {
        m.reply(`*~> ${m._data.notifyName}:* ${text || "gk tau, dia gk ngetik apa² bjirr🗿"}`)
    }
}