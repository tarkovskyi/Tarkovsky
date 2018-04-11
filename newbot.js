const Discord = require('discord.js');
const client = new Discord.Client();
const CC = require('./command_create.js');
const Command = CC.Command;

var Commandss = new CC.Commands();
var fs = require("fs");



function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("Префикс" + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role)
{
    if (pluck(mem.roles).includes(role))
    {
        return true;
    }
    else
    {
        return false;
    }
}

client.on('ready', () => {
    client.user.setActivity("S.T.A.L.K.E.R.", { type: 1});
   

});

client.setInterval(function game()
{
    var hours = new Date(Date.now()).getHours().toString()
   var minutes = new Date(Date.now()).getMinutes().toString()
if(hours == "Во сколько часов должна быть рассылка" && minutes == "Во сколько минут должна быть рассылка")//вместо -- ставить время 
{
 
    client.users.forEach(cheli => cheli.send("Приветствую на нашем сервере **{server}** ! \nПервым делом ознакомься с правилами сервера: #правила \nСовет:\nНе спеши покидать сервер если на данный момент никто не играет - все мы живые люди,работаем,проводим время с семьёй и т.д.\nЗаходи в голосовую 'комнату' даже если там никого нет - к тебе присоединятся желающие поиграть в отряде,и аналогично присоединяйся к уже играющим игрокам. Не стесняйся писать в чат предложения о совместной игре.\nПо всем вопросам пиши: Tarkovsky (Влад)."))
  
 
}

}, 60000)


client.on('message', message =>
{ 
    
    if (message.channel.type !== 'text' || message.author.bot) return;
if(message.content.toLowerCase().startsWith("привет"))
{
  
 message.channel.send("Здравствуй,сталкер!")
}

});
client.on("guildMemberAdd", member =>
{
  let guild = member.guild;
  if (guild.channels.filter(c => c.name.includes("чат")).first() !== undefined)
  guild.channels.filter(c => c.name.includes("чат")).first().send(`Здравствуй,${member},присаживайся у нашего костра,сталкер.`);

  /*

  ${member} - ник пользователя
  ${guild.name} - название сервера
  <@${member.id}> - упоминание пользователя

  */

  
  // Выдача роли

  if(guild.roles.filter(r=>r.name.toLowerCase().includes(`Soldiers`)).first() !== undefined) {
    var foundRole = guild.roles.filter(r=>r.name.toLowerCase().includes(`Soldiers`)).first();

  member.addRole(foundRole.id)  } else {}
})

client.login(process.env.BOT_TOKEN);
