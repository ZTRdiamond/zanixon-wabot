module.exports = {
    name: "joingrup",
    type: "main",
    code: async(zanixon, m, { zn, sender, text }) => {
       if(text) {
           m.reply(zn.emoji("alert") + "︱Mana link grup yang bakal dimasukan bot ini?");
           return;
       }
       let user = sender.replace("@c.us", "");
       let teer = `https://trakteer.id/zanixongroup/tip?qquantity=5&display_name=${user}&supporter_message=bot+join+grup+ku+dong:+${text}`;  
       let pesan =  `*Pembelian masa aktif bot join grup*

Silahkan klik link dibawah untuk melakukan pembayaran
${teer}

*Note:* setelah pembayaran, admin akan mengurus transaksi lalu bot akan dimasukan oleh admin.

*Contact:* wa.me/62856971039020 - admin`;
       m.reply(pesan);
    }
}