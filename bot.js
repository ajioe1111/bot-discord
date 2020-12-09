const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
let config = require('./config.json');
let prefix = config.prefix;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on(`message`, msg => {
  if (msg.content == prefix + `add`) {
    msg.reply(`Ошибка ввода! Пример команды: !add Name;OriginalName;Age;DateOfBirth;Description`);
  }
  else if (msg.content.startsWith(prefix + `add`)) {
    let args = msg.content.split(' ');
    args.shift();
    args = args[0].split(';');
    if (args.length != 5) {
      msg.reply(`Ошибка ввода! Пример команды: !add Name;OriginalName;Age;DateOfBirth;Description`);
    }
    else {
      let waifuArr = checkWaifu();
      let name = args[0];
      let original = args[1];
      let waifuAge = args[2];
      let date = args[3];
      let desc = args[4];
      let waifuId = waifuArr.length;
      let waifu = { fullName: name, id: waifuId, originalName: original, age: waifuAge, dateOfBirth: date, description: desc };
      waifuArr.push(name);
      saveWaifu(waifuId, waifu, waifuArr);
      msg.reply(`Waifu создана!`);
    }
  }
});


client.on(`message`, msg => {
  if (msg.content === prefix + `list`) {
    msg.channel.send('Список Waifu')
    let waifuArr = checkWaifu();
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

function checkWaifu() {
  let waifujson = fs.readFileSync("waifulist.json", 'utf-8');
  let waifuArr = JSON.parse(waifujson);
  return waifuArr;
}

function saveWaifu (id, waifu, arr) {
  fs.writeFileSync(`./waifu/${id}.json`, JSON.stringify(waifu));
  var json = JSON.stringify(arr);
  fs.writeFileSync("waifulist.json", json);
}


client.login(config.token);