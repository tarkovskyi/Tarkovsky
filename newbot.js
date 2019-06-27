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
    client.user.setActivity("ВЫЖИВАЧ", { type: 1});
   

});

client.setInterval(function game()
{
    var hours = new Date(Date.now()).getHours().toString()
   var minutes = new Date(Date.now()).getMinutes().toString()
if(hours == 360  && minutes == 00 )//вместо -- ставить время 
{
 
    client.users.forEach(cheli => cheli.send("приглашайте знакомых и друзей,или просто размещайте инфу в соцсетях о сервере."))
  
 
}

}, 60000)


client.on('message', message =>
{ 
    
    if (message.channel.type !== 'text' || message.author.bot) return;
if(message.content.toLowerCase().startsWith("привет"))
{
  
 message.channel.send("Здравия желаю,боец!")
}

});
client.on("guildMemberAdd", member =>
{
  let guild = member.guild;
  if (guild.channels.filter(c => c.name.includes("чат")).first() !== undefined)
  guild.channels.filter(c => c.name.includes("чат")).first().send(`Присаживайся у нашего костра, друг ${member},для начала прочти правила. Поиск напарников - в голосовых комнатах.`);

  /*

  ${member} - ник пользователя
  ${guild.name} - название сервера
  <@${member.id}> - упоминание пользователя

  */

  
  // Выдача роли

  if(guild.roles.filter(r=>r.name.toLowerCase().includes(`выживший`)).first() !== undefined) {
    var foundRole = guild.roles.filter(r=>r.name.toLowerCase().includes(`выживший`)).first();

  member.addRole(foundRole.id)  } else {}
})
client.on("guildMemberRemove", member =>
{
    console.log(member.user.username)
  let guild = member.guild;
  if (guild.channels.filter(c => c.name.includes("")).first() !== undefined)
  guild.channels.filter(c => c.name.includes("")).first().send(` `+ member.user.username+ ``);

  /*

  ${member} - ник пользователя
  ${guild.name} - название сервера
  <@${member.id}> - упоминание пользователя

  */
})
client.login(process.env.BOT_TOKEN)
