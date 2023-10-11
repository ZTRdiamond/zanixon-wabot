module.exports = {
    name: "exit",
    path: "/exit",
    type: "get",
    code: async(req, res, { query }) => {
        let key = query.key;
        let pw = "zanixon2023best";
        if(key === pw) {
            res.status(200).json({ message: "Exit program successfully!" });
            console.log("[System] bot was stopped using '/exit' route API!");
            process.exit();
        } else {
            res.status(403).json({ message: "bro try to exit my bot, lmao" });
        }
    }
}