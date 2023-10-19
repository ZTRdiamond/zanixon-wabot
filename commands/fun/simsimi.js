const axios = require('axios');

module.exports = {
  name: "simi",
  aliases: ["simsimi"],
  type: "fun",
  details: {
      desc: "Mengobrol dengan chatbot bernama simi",
      usage: "%prefix%command (on/off atau pertanyaan)"
  },
  code: async (zanixon, m, { zn, prefix, command, sender }) => {
    const commands = ["simi", "simsimi"];
    const msgBody = m.body;
    const commandBody = msgBody.startsWith(prefix) ? msgBody.slice(prefix.length) : null;
    const matchedCommand = commands.find((command) => commandBody && commandBody.startsWith(command));
    const text = matchedCommand ? commandBody.slice(matchedCommand.length).trim() : null;

    if (text == "on") {
      zn.setVar('simi', true, sender);
      m.reply(`${zn.emoji("success")}│Chatbot simi telah di aktifkan di chat private
*Chat:* +${sender.replace('@c.us', '')}
*Nama:* ${m._data.notifyName}
*Status Chatbot:* Aktif

*Note:* auto chatbot simi hanya akan membalas di chat private.`);
    } else if (text == "off") {
      zn.setVar('simi', false, sender);
      m.reply(`${zn.emoji("success")}│Chatbot simi telah di non-aktifkan di chat private
*Chat:* +${sender.replace('@c.us', '')}
*Nama:* ${m._data.notifyName}
*Status Chatbot:* Non-aktif

*Note:* auto chatbot simi hanya akan membalas di chat private.`);
    } else {
      axios.post('https://api.simsimi.vn/v1/simtalk', `text=${text}&lc=id`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          const simi = response.data.message ? response.data.message : response.data.error;
          m.reply(`*Pesan dari simi:*
${simi}`);
        })
        .catch(error => {
          m.reply(`*Pesan dari simi:*
Maaf kak, Simi gagal melakukan request ke sistem.`);
          console.error(error);
        });
    }
  }
};
