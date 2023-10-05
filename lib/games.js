const db = require("zanixon.db");
let dbPath = "games";

db.variable({
    "name":"null",
    "money":0,
    "level":0,
    "exp":0,
    "expEarn":25,
    "reqexp":687,
    "trash":0,
    "scavengePower":1,
    "scavengeUpPrice":15000,
    "scavengeUp":5,
    "backpackFill":0,
    "backpackSpace":10,
    "backpackUpPrice":10000,
    "backpackUp":10,
    "trashPrice":100,
    "scavengeCount":0,
    "trashCollected":0,
    "recycleCount":0,
    "moneySpent":0
}, "games");

db.regEmoji({
    "money":"💵",
    "level":"🧬",
    "trash":"🗑️",
    "price":"🏷️",
    "scavenge":"🧹",
    "bag":"👝",
    "backpack":"🎒",
    "recycle":"♻️"
});

module.exports = {
    random: function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomText: function randomText(...texts) {
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    },
    get: function get(id, varb) {
        if(!db.has(id, null, dbPath, true)) {
            console.log("Master Recycler:", `user with id '${id}' is not found in database!`);
            return null;
        }
        if(!db.has(varb, id, dbPath, true)) {
            console.log("Master Recycler:", `variable named "${varb}" is not found in "${id}" user data!`);
            return db.get(varb, id, dbPath, true);
        }
        let res = db.get(varb, id, dbPath, true);
        if(!isNaN(res)) {
            return res;
        } else {
            return res;
        }
    },
}