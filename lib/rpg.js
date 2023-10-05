const zn = require('zanixon.db');
const dbn = "games";
//var economy
zn.variable({
    "name":"unknown",
    "credits":0
}, "games");



function isRegistered(id) {
    const verify = zn.get("registered", id, dbn, false);
    if(verify == undefined) {
        zn.set("registered", false, id, dbn, false);
        return false;
    }
    return verify ? undefined : false;
    }
 
 function coin(id) {
    const coin = zn.get("coin", id, dbn);
    const emoji = zn.emoji("coin");
    return `${emoji}Coin: *${zn.abbreviate(coin, "0.00a")}*`;
}

function health(id) {
    const health = zn.get("health", id, dbn);
    const emoji = zn.emoji("health");
    return `${emoji}Health: *${zn.abbreviate(health, "0.00a")}*`;
}

function level(id) {
     const level = `*${zn.abbreviate(zn.get("level", id, "games"), "0.00a")}* (${zn.abbreviate(zn.get("exp", id, "games"), "0.00a")}/${zn.abbreviate(zn.get("reqexp", id, "games"), "0.00a")})`;
     const emoji = zn.emoji("level");
     return `${emoji}Level: ${level}`;
}

function stamina(id) {
     const stamina = zn.get("stamina", id, "games");
     const emoji = zn.emoji("stamina");
     return `${emoji}Stamina: *${zn.abbreviate(stamina, "0.00a")}*`;
}

function mana(id) {
     const mana = zn.get("mana", id, "games");
     const emoji = zn.emoji("mana");
     return `${emoji}Mana: *${zn.abbreviate(mana, "0.00a")}*`;
}

module.exports = {
    isRegistered: isRegistered,
    coin: coin,
    level: level,
    health: health,
    stamina: stamina,
    mana: mana
};