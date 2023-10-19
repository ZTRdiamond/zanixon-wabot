var msgap = msg._data.quotedMsg ? await msg.getQuotedMessage() : msg;
      if (msgap.hasMedia) {
        var file = await client.downloadMediaMessage(msgap._data);
        client.sendMessage(chatId, Buffer.from(file.data, "base64"), {
        caption: (q || msgap.body || "").replace(command, "") || "", mentions: groupMetadata.participants.map(a => a.id._serialized)
        })
      } else {
      client.sendMessage(chatId, (q || msgap.body || "").replace(command, "") || "", {
        quoted: msg, mentions: groupMetadata.participants.map(a => a.id._serialized)
      });
      }