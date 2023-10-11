module.exports = {
    name: "premium",
    type: "main",
    details: {
        desc: "Daftar keuntungan menjadi pengguna premium"
    },
    code: async(zanixon, m, { zn, sender }) => {
        let user = sender.replace("@c.us", "");
        let teer = `https://trakteer.id/zanixongroup/tip?display_name=${user}`;  
        let teks = `⬤⚍⚍ *ZanixonMD | Premium Benefits* ⚍⚍⬤

*#1︱Silver - 4.999 / bulan*
➭ Mengurangi 5% cooldown di semua command
➭ Akses ke command terbatas 
➭ Limit up to 2000/bulan

*#2︱Gold - 9.899 / bulan*
➭ Mengurangi 15% cooldown di semua command
➭ Akses ke command terbatas 
➭ Limit up to 5000/bulan

*#3︱Iron - 14.499 / bulan*
➭ Mengurangi 20% cooldown di semua command
➭ Akses ke command terbatas 
➭ Limit up to 8000/bulan

*#4︱Diamond - 18.999 / bulan* Best!!!
➭ Mengurangi 50% cooldown di semua command
➭ Akses ke command terbatas 
➭ Limit up to 12.000/bulan

*#5︱Platinum - 29.999 / bulan*
➭ Tanpa cooldown di semua command
➭ Akses ke command terbatas 
➭ Limit up to UNLIMITED

*Support all payment via trakteer:*
${teer}`;
        m.reply(teks);
    }
}