
# ZanixonMD - Whatsapp Bot

A simple whatsapp bot using command handler to manage the commands easily and have some useful features

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)


## Information

This is a recoded bot from bot [hisoka-waweb.js](https://github.com/Hisoka-Morrou/hisoka-waweb.js), the parts that I recode are quite a lot, especially the command handler which I changed so that it can read files in subfolder and change the command categorization from folder to `command.type` from the command option, this bot code is still quite stable running on [wwebjs](https://github.com/pedroslopez/whatsapp-web.js) so I recode it.
## Installation

How to install the bot

```bash
git clone https://github.com/ZTRdiamond/zanixon-wabot
cd zanixon-wabot
npm install or yarn
npm start or PORT=3000 node index.js
```
    
## Features

This bot has several useful features

### API
|route|query param|description|
|---|---|---|
|`/exit`|`key`|this route using to force shutdown the bot|
|`/up`|`urls`|this route using for reupload image or video file from image url to [pomf.lain.la](https://pomf.lain.la), a free unlimited file hosting|

### Commands
|Command|Status|
|---|---|
|sticker|🟢|
|stickerwm|🟢|
|toimage|🟢|
|pixiv|🟢|
|waifu|🟢|
|neko|🟢|
|husbu|🟢|
|loli|🟢|
|pinterest|🟢|
|tiktokdl|🟢|
|tiktokmp3|🟢|
|ytvideo|🟢|
|ytaudio|🟢|
|facebookdl|🟢|
|instagramdl|🔴|
|ai|🟢|
| ***and so on...*** |...|

## Create new command

You can put the file everywhere inside `./commands/` folder

```javascript
module.exports = {
    name: "command",
    aliases: ["cmd"],
    type: "main",
    isOwner: boolean,
    isAdmin: boolean,
    isPremium: boolean,
    isLimit: boolean,
    isGroup: boolean,
    isPrivate: boolean,
    isQuery: boolean,
    isMedia: boolean,
    isBotAdmin: boolean,
    isBot: boolean,
    isRegistered: boolean,
    disable: boolean,
    details: { desc: "bla bla bla", usage: "%prefix%command" },
    code: async(zanixon, m, { commandOptions }) => {
        // ur code here
    }
}
```

