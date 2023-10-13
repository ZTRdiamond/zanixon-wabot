require("./config")
const fs = require("fs")
const zn = require("zanixon.db");
const yargs = require("yargs/yargs")
const chalk = require("chalk")
const qrcode = require("qrcode-terminal")
const util = require("util")
const path = require("path")
const glob = require("glob");
const Commands = new Map();
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js")
const { jsonformat } = require("./lib/Function");
const axios = require('axios');
const FormData = require('form-data');
const app = require("./api.js");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/payment/add/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;
    console.log(data);
    res.json({msg: "success!", id: id, data: [data]});
});

let port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

const loadCommands = () => {
    let dir = path.join(__dirname, "./commands");
    let rawType = new Set();
    let listType = [];
    let listCommand = {};
    try {
        let files = glob.sync(`${dir}/**/*.js`);
        console.log("Starting to load all commands...".info);
        let cmdCount = 1;
        files.forEach((file) => {
             const command = require(file);
             let groups = command.type;
             groups = groups === '' ? '_' : groups;
             listCommand[groups] = listCommand[groups] || [];
             cmdCount++;
             let options = {
                 name: command.name ? command.name : "",
                 alias: command.alias ? command.alias : [],
                 details: command.details ? command.details : {
                     desc: "none",
                     usage: "none"
                 },
                 type: command.type ? command.type : "others",
                 isMedia: command.isMedia ? command.isMedia : false,
                 isNsfw: command.isNsfw ? command.isNsfw : false,
                 isOwner: command.isOwner ? command.isOwner : false,
                 isGroup: command.isGroup ? command.isGroup : false,
                 isPrivate: command.isPrivate ? command.isPrivate : false,
                 isBotAdmin: command.isBotAdmin ? command.isBotAdmin : false,
                 isAdmin: command.isAdmin ? command.isAdmin : false,
                 isBot: command.isBot ? command.isBot : false,
                 isPremium: command.isPremium ? command.isPremium : false,
                 disable: command.disable ? command.disable : false,
                 isQuery: command.isQuery ? command.isQuery : false,
                 isRegistered: command.isRegistered ? command.isRegistered : false,
                 nonPrefix: command.nonPrefix ? command.nonPrefix : false,
                 code: command.code ? command.code : () => {}
             }
             listCommand[groups].push(options)
             Commands.set(options.name, options)
             //Commands.type = command.filter(v => v !== "_").map(v => v);
             const theType = command.type ? command.type : "others";
             if(!rawType.has(theType)) {
                 rawType.add(theType);
                 listType.push(theType);
             }
             global.reloadFile(file)
             console.log("ZanixonMD:".zanixon, `Loaded ${command.name}`.warn, `\n➭ status: ${command.disable ? "Disable 🔴" : "Active 🟢"}\n➭ Type: ${groups}\n➭ Location: ${file.replace(__dirname, "")}`.debug, `\n・------------------------------------------`.info);
        })
        zn.set("commandCount", cmdCount, null, null, true);
        console.log(`Success load ${cmdCount} commands from "./commands" directory`.info);
    } catch(e) {
        console.error(e) 
    }
    Commands.list = listCommand;
    Commands.type = listType;
}

async function connect() {
    await loadCommands()
    const zanixon = new Client({
        restartOnAuthFail: true,
        authStrategy: new LocalAuth({ clientId: "client" }),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    })

    zanixon.initialize()

    if (global.opts["server"]) {
        require("./lib/Server")(zanixon, process.env.PORT || 8000)
    } else if (!global.opts["server"]) {
        zanixon.on("qr", qr => {
            qrcode.generate(qr, { small: true })
        })
    }

    zanixon.on("authenticated", async(auth) => {
        console.log(auth)
    })

    zanixon.on("auth_failure", async(auth_err) => {
        console.log(auth_err)
    })

    zanixon.on("ready", () => {
        console.clear();
        console.log(chalk.greenBright("Client Is Already Running!"))
    })

    zanixon.on("disconnected", async(reason) => {
        console.log("Disconnect ", reason)
        connect()
    })

    zanixon.on("message_create", (msg) => {
        const isOwner = [zanixon.info.wid._serialized, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(msg.author || msg.id.remote)
        try {
            if (!msg) return
            //if (global.options.public == false && isOwner == false) return 
            //if(!isOwner && zn.get("banned", msg.author || msg.id.remote, null, true)) return
            if (msg.id.id.startsWith("3EB") && msg.id.id.length == 20) return
            require("./zanixon_chat")(zanixon, msg, Commands)
        } catch(e) {
            console.error(e)
        }
    })

    /*zanixon.on("group_update", (action) => {
        if (!action) return action
        require("./zanixon_group")(zanixon, action)
    })*/
    
    zanixon.on('message', async(m) => {
        const { simi } = require("./lib/utils.js");
        const zn = require('zanixon.db');
        let sender = m.author || m.id.remote;
        const { body, from } = m;
        const isGroup = from.endsWith("@g.us");
        var prefix = body.match(/^[+=!?#$%.]/gi) || '.';
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    //const text = body.replace(prefix + command, '');
    //const simi = `${utils.simi(body)}`;
        if(body.startsWith(prefix + command) == false && isGroup == false) {
            if(zn.getVar("simi", sender, null, "default", true) == true) {
                const simiResult = await simi(body); // menunggu hasil Promise
                m.reply(`*Pesan dari Simi:*
${simiResult}`);
            }
        }
    });


    return zanixon
}

connect()
