const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
let config = require('./config.json');
let prefix = config.prefix;
let waifuArr = ['Megumin', 'Rem']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(`message`, msg => {
  if (msg.content === prefix + `list`) {
    msg.channel.send('Список Waifu')
    for (let i = 0; i < waifuArr.length; i++) {
      let waifu = waifuArr[i];
      msg.channel.send(waifu + ` { ID ${i}}`);
    }
  }
});

client.on(`message`, (msg) => {
  if (msg.content.startsWith(prefix + 'get')) {
    let args = msg.content.split(' ');
    let searchWaifu = (`./waifu/${args[1]}.json`);
    if (fs.existsSync(searchWaifu)) {
      let cacheWaifu = fs.readFileSync(searchWaifu).toString();
      let waifu = JSON.parse(cacheWaifu);
      msg.reply(`Информация о Waifu`);
      msg.channel.send(`Полное имя: ${waifu.fullName}\r\n Оригинальное имя: ${waifu.originalName}\r\n Возраст: ${waifu.age}\r\n День рождения: ${waifu.dateOfBirth}\r\n \r\n Описание: ${waifu.description}\r\n \r\n ID: ${waifu.id}`);
    }
    else {msg.reply(`Нету waifu под таким ID ;(`)}
  }
});


client.on('message', msg => {
  if (msg.content === prefix + 'ping') {
    msg.reply('Pong!');
  }
});





client.login(config.token);