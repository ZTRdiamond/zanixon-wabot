const iyh = require('../../lib/utils.js');

module.exports = {
    name: "tes",
    type: "owner",
    start: async(zanixon, m, { prefix, text }) => {
        m.reply(`*Message from ${m._data.notifyName}:* \n${text}`)
    }
}