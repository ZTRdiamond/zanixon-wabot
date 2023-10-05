module.exports = {
    name: "exit",
    aliases: ["exitbot","processexit"],
    type: "owner",
    desc: "Stop/exit the bot program",
    isOwner: true,
    code: async(zanixon, m) => {
        console.log('The bot program has stoped!')
        process.exit()
    }
}