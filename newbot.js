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
    client.user.setActivity("Escape From Tarkov", { type: 1});
   

});

client.setInterval(function game()
{
    var hours = new Date(Date.now()).getHours().toString()
   var minutes = new Date(Date.now()).getMinutes().toString()
if(hours == 12  && minutes == 00 )//вместо -- ставить время 
{
 
    client.users.forEach(cheli => cheli.send("Бойцы,кому нравится наше сообщество - приглашайте знакомых и друзей,или просто размещайте инфу в соцсетях о сервере. Буду благодарен за помощь. п.с. но вход строго от 20+,ясли и детский сад тут не нужны."))
  
 
}

}, 60000)


client.on('message', message =>
{ 
    
    if (message.channel.type !== 'text' || message.author.bot) return;
if(message.content.toLowerCase().startsWith("привет"))
{
  
 message.channel.send("Салют боец!")
}

});
client.on("guildMemberAdd", member =>
{
  let guild = member.guild;
  if (guild.channels.filter(c => c.name.includes("чат")).first() !== undefined)
  guild.channels.filter(c => c.name.includes("чат")).first().send(`Салют боец ${member},прочти #устав и в бой!`);

  /*

  ${member} - ник пользователя
  ${guild.name} - название сервера
  <@${member.id}> - упоминание пользователя

  */

  
  // Выдача роли

  if(guild.roles.filter(r=>r.name.toLowerCase().includes(`оператор чвк`)).first() !== undefined) {
    var foundRole = guild.roles.filter(r=>r.name.toLowerCase().includes(`оператор чвк`)).first();

  member.addRole(foundRole.id)  } else {}
})
client.on("guildMemberRemove", member =>
{
    console.log(member.user.username)
  let guild = member.guild;
  if (guild.channels.filter(c => c.name.includes("чат")).first() !== undefined)
  guild.channels.filter(c => c.name.includes("чат")).first().send(`K.I.A.,`+ member.user.username+ `,пропал безвести в Таркове. Мы будем помнить тебя.`);

  /*

  ${member} - ник пользователя
  ${guild.name} - название сервера
  <@${member.id}> - упоминание пользователя

  */
})
client.login(process.env.BOT_TOKEN)
