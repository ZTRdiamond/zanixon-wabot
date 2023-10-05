const fs = require("fs")
const chalk = require("chalk")
const zn = require('zanixon.db');
const colors = require("colors");

//custom colors for beautiful console.log()
colors.setTheme({
   main: ['cyan', 'bold'],
   silly: 'rainbow',
   input: 'grey',
   verbose: 'cyan',
   prompt: 'grey',
   info: 'green',
   data: 'grey',
   help: 'cyan',
   warn: 'yellow',
   debug: 'blue',
   error: 'brightRed'
});

zn.storage({
    "games":"./database/economy.json",
    "cooldown":"./database/cooldown.json",
    "config":"./database/config.json",
    "donation":"./database/donation.json"
});

zn.variable({
    autoRead: true,
    mute: false,
    public: true,
    stickerPackname: "Wa: +62 856-9710-3902",
    stickerAuthor: "© ZanixonMD",
    menuImage: "https://pomf.lain.la/f/0x18bmef.jpg",
    owner: false,
    botAdmin: false
}, "config");

//var default
zn.variable({
    "cooldown":10,
    "premium":false,
    "premiumDuration":"0d 0h 0m 0s",
    "premiumTimestamp":0,
    "limit":20,
    "verify":false,
    "simi":false,
    "prefix":".",
    "banned": false
}, "default");

zn.regEmoji({
    //notif
    "success":"✅",
    "failed":"❌",
    "alert":"❗",
    "warn":"⚠️",
    "error":"😵",
    "wait":"⏱️",
    //economy 
    "health":"♥️",
    "stamina":"⚡",
    "mana":"☘️",
    "level":"🧬",
    "exp":"🧬",
    "coin":"🪙"
});



global.reloadFile = (file, options = {}) => {
    nocache(file, module => console.log(chalk.greenBright(`File "${file}" has updated`)))
}


// Rest Api
global.APIs = {
    xzn: 'https://xzn.wtf',
}

// Apikey
global.APIKeys = {
	'https://xzn.wtf': 'ztrdiamond',
}

// Other
global.mess = (type, m) => {
    let msg = {
        owner: `${zn.emoji("alert")}︱Perintah ini hanya dapat digunakan oleh Owner!`,
        group: `${zn.emoji("alert")}︱Perintah ini hanya dapat digunakan di group!`,
        private: `${zn.emoji("alert")}︱Perintah ini hanya dapat digunakan di private chat!`,
        admin: `${zn.emoji("alert")}︱Perintah ini hanya dapat digunakan oleh admin group!`,
        botAdmin: `${zn.emoji("alert")}︱Bot bukan admin, tidak dapat mengakses fitur tersebut`,
        bot: `${zn.emoji("warn")}︱Fitur ini hanya dapat diakses oleh Bot`,
        dead: `${zn.emoji("alert")}︱Fitur ini sedang dimatikan!`,
        media: `${zn.emoji("alert")}︱Reply media nya`,
        error: `${zn.emoji("failed")}︱Tidak ada hasil yang ditemukan`,
        premium: `${zn.emoji("alert")}︱Fitur ini khusus user premium!`,
        limit: `${zn.emoji("alert")}︱Limit kamu telah habis untuk melakukan request command ini!`
    }[type]
    if (msg) return m.reply(msg)
}

global.options = {
    autoRead: true,
    mute: zn.get("mute", null, "config", true),
    public: zn.get("public", null, "config", true)
}

global.owner = ["6285888213719","6285781151132"]
global.sessionName = "zanixon"
global.packname = zn.get("stickerPackname", null, "config", true);
global.author = zn.get("stickerAuthor", null, "config", true);


function nocache(module, cb = () => {}) {
    //console.log(chalk.whiteBright(`Load File "${module}"`))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.greenBright(`Update File "${file}"`))
})
