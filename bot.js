const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
let config = require('./config.json');
let prefix = config.prefix;

let waifuArr = ["Megumin", "Rem"];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on(`message`, msg => {
  if (msg.content.startsWith(prefix + `add`)) {
    let args = msg.content.split(' ');
    args.shift();
    args = args[0].split(';');
    if (args[0] == undefined || args[1] == undefined || args[2] == undefined || args[3] == undefined || args[4] == undefined) {
      (msg.reply(`Ошибка ввода! Пример команды: !add Name;OriginalName;Age;DateOfBirth;Description`));
    }
    else {
      let name = args[0];
      waifuArr.push(name);
      let original = args[1];
      let waifuAge = args[2];
      let date = args[3];
      let desc = args[4];
      let waifuId = waifuArr.length - 1;
      let waifu = { fullName: name, id: waifuId, originalName: original, age: waifuAge, dateOfBirth: date, description: desc };
      fs.writeFileSync(`./waifu/${waifuId}.json`, JSON.stringify(waifu));
      msg.reply(`waifu добавлена!`);
    }
  }
})



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
    else { msg.reply(`Нету waifu под таким ID ;(`) }
  }
});


client.on('message', msg => {
  if (msg.content === prefix + 'ping') {
    msg.reply('Pong!');
  }
});





client.login(config.token);