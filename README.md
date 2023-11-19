![Zanixon Wabot](https://pomf2.lain.la/f/z2o65gj.png)

# ZanixonMD - Whatsapp Bot

A simple whatsapp bot using command handler to manage the commands easily and have some useful features

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg?style=for-the-badge)](https://creativecommons.org/licenses/by-nc/4.0/) ![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/ZTRdiamond/zanixon-wabot?logo=github&cacheSeconds=12000&style=for-the-badge) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/ZTRdiamond/zanixon-wabot?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/ZTRdiamond/zanixon-wabot?logo=github&style=for-the-badge&link=https%3A%2F%2Fgithub.com%2FZTRdiamond%2Fzanixon-wabot) ![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/ZTRdiamond/zanixon-wabot/main?style=for-the-badge&logo=github)


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
|instagramdl|🟢|
|ai|🟢|
| ***and so on...*** |...|

## Create new command

You can put the file everywhere inside `./commands/` folder, with this system the command becomes more organized and neat. the `type` option specifies the category of the command so that commands are merged and more organized!

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
    cooldown: { duration: 10, msg: `Please wait, You can call this cmd in {hour}h {min}m {sec}s again!` },
    disable: { active: true, msg: "This command is on disable mode!", emoji: "alert" },
    details: { desc: "bla bla bla", usage: "%prefix%command" },
    code: async(zanixon, m, { commandOptions }) => {
        // ur code here
    }
}
```
## Thanks for
- God
- [Pedro S Lopez](https://npmjs.com/package/whatsapp-web.js) - Library
- [Dika Ardianta](https://github.com/Hisoka-Morrou/hisoka-waweb.js) - Base
- [ZTRdiamond](https://github.com/ZTRdiamond) - Continued development

## Special Thanks
A big thank you to our sponsor **Bang Jeri** who has sponsored the **ZanixonMD** bot all this time, Thanks to him this bot can continue to grow and also encourages me as a developer who develops this bot further. Thank you so much for your support!!!

---
<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/ZTRdiamond/zanixon-wabot">Zanixon Wabot</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/ZTRdiamond">ZTRdiamond</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"></a></p>

