var Discord = require("discord.io")
var bot = new Discord.Client({
    token: require("./token.js").token,
    autorun: true
})
bot.on("message", function (user, userID, channelID, msg, rawEvent) {
    if (user == "DiscordRPG") {
        msg = msg.replace(/[^\x00-\x7F]/g, "");
        if (msg.match(/used \d+ health potion/i)) return;
        if (msg.match(/tried to use \d+ health potions/i)) {
            bot.sendMessage({
                to: channelID,
                message: "#!buy Health Potion 10"
            });
            return
        }
        if (msg.match(/!======== \[\w+'s adventure\] ========!/i)) {
            var info = {
                rolled: parseInt(msg.match(/Rolled a (\d+)/)[1]),
                lost: parseInt(parseInt(msg.match(/Lost (\d+) HP/)[1])),
                dealt: parseInt(parseInt(msg.match(/Dealt (\d+) HP/)[1])),
                petLost: parseInt(msg.match(/took (\d+) HP/)[1]),
                curPethp: parseInt(msg.match(/has (\d+)\/\d+ HP left/)[1]),
                maxPethp: parseInt(msg.match(/has \d+\/(\d+) HP left/)[1]),
                curhp: parseInt(msg.match(/has (\d+)\/\d+ HP left\./)[1]),
                maxhp: parseInt(msg.match(/has \d+\/(\d+) HP left\./)[1]),
                enemyName: msg.match(/The enemy (\w+)/)[1]
            }
            if (msg.match(/The enemy \w+ was/)) {
                info.enemyKilled = true
            } else {
                info.curEnemyhp = parseInt(msg.match(/The enemy \w+ has (\d+)\/\d+ HP left/)[1])
                info.maxEnemyhp = parseInt(msg.match(/The enemy \w+ has \d+\/(\d+) HP left/)[1])
            }
            // console.log(info);
            if (info.maxhp - info.curhp > 50) {
                bot.sendMessage({
                    to: channelID,
                    message: "#!heal"
                });
            }
            if (!info.enemyKilled) {
                setTimeout(function() {
                    bot.sendMessage({
                        to: channelID,
                        message: "#!adv"
                    });
                },14500)
            }
        }
    }
});
