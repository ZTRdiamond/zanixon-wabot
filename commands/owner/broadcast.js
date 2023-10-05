module.exports = {
    name: "broadcast",
    alias: ["bc"],
    desc: "Broadcast pesan atau media ke semua user bot",
    example: "Example: %prefix%command <pesan atau attach media>",
    isOwner: true,
    code: async (zanixon, m, { quoted, zn, body, prefix, command }) => {
        const inputText = body.replace(prefix + command, '');
        const text = `・Broadcast Message by ZanixonMD・\n\n${inputText}`;
        const mediaAttachments = quoted ? quoted.downloadMedia() : m.downloadMedia();

        if ((text || mediaAttachments) && (text.trim() !== '' || mediaAttachments)) {
            const chats = await zanixon.getChats();
            let sentCount = 0;

            for (const chat of chats) {
                if (!chat.isGroup) {
                    try {
                        if (text) {
                            await zanixon.sendMessage(chat.id._serialized, text);
                        }

                        if (mediaAttachments) {
                            await zanixon.sendMessage(chat.id._serialized, mediaAttachments, m.type);
                        }

                        sentCount++;
                    } catch (error) {
                        console.error(`Gagal mengirim pesan ke chat ${chat.id._serialized}:`, error);
                    }
                }
            }

            m.reply(`Broadcast selesai! Pesan atau media telah dikirim ke ${sentCount} chat.`);
        } else {
            m.reply(`${zn.emoji("alert")}│Tolong masukan pesan atau attach media yang akan di broadcast!`);
        }
    }
}
