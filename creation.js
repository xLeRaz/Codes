const Discord = require('discord.js');
const prefix = "-";
const hero = new Discord.Client({maxMessagesCache: 1});

hero.on('ready', async () => {
	console.log(`Client is ready.`);
	console.log();
	console.log(`Logged in ${hero.user.tag}`);
  hero.generateInvite(['ADMINISTRATOR']).then(link => console.log(link));
  hero.user.setActivity('Codes Development .', {type: 1, url: "https://twitch.tv/6xlez1"});
	
  rainbow(2, '495535995069136897', '495540536267112448', false);
  function rainbow(speed, guildid, roleid, enabled) {
    if(enabled !== true && enabled !== false) throw new Error("SyntaxError: Rainbow enabled state must be true or false.");
    if(enabled === false) return;
    let guild = hero.guilds.get(guildid);
    let role = guild.roles.get(roleid);
    let changeSpeed = speed * 1000;

    setInterval(() => {
      role.edit({
        color: 'RANDOM'
      });
    }, changeSpeed);
  }
	setInterval(() => {

    if(hero.guilds.size > 1) {
  	  hero.guilds.forEach(g => {
  	    if(g.id === '450925741010583572') return;
  	    g.leave();
  	  });
  	}
  }, 10000);
});

hero.on('message',async message => {
	if(message.author.bot || message.channel.type === 'dm' || message.guild.id !== '450925741010583572') return;
	let args = message.content.split(' ');
	let author = message.author;
  let guild = message.guild;
	let mention = message.mentions.users.first();

  let lang;
  let time;
  let exp;

  let code;
  let desc;
  let creator;
	if(args[0] === `${prefix}تقديم`) {
      try {
      message.delete().catch();
      if(message.member.roles.has('477972887391698964')) return message.channel.send('- **أنت تملك رتبة السبورت بالفعل**');
      let msg = await message.channel.send('- **أكتب لغتك البرمجية الان**');
      let awaiting = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 20000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        lang = collected.content;
        msg = await msg.edit('- **أكتب مدة خبرتك البرمجية الان**');
        awaiting = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 20000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          time = collected.content;
          msg = await msg.edit('- **أكتب خبرتك البرمجية الان**');
          awaiting = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 20000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            exp = collected.content;
            msg = await msg.edit(`» اللغة : **${lang}**\n» المدة : **${time}**\n» الخبرة : **${exp}**\n\n **هل انت متأكد ؟**`);
            await msg.react('✅');
            await msg.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = msg.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = msg.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              msg = await msg.delete().catch();
              message.channel.send('- **تم ارسال التقديم**');
              let c = message.guild.channels.get('499973167302049801');
              c.send(`» اللغة : **${lang}**\n» المدة : **${time}**\n» الخبرة : **${exp}**\n\n تم التقديم بواسطة : ${author}`);
            });
            falseM.on('collect', async (r) => {
              msg = await msg.delete().catch();
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}قبول`) {
		if(!message.member.roles.has('499973565211475978')) return message.channel.send('- **يجب عليك ان تكون من ادارة السيرفر**');
		if(!mention) {
			let m = await message.channel.send('- **منشن العضو الذي تريد قبوله**');
			message.delete().catch();
			return m.delete(5000);
		}

		let member = message.guild.member(mention);
		let c = message.guild.channels.get('499978004110245901');
		let role = message.guild.roles.find(r => r.name === '- Support');
    		let sup = message.guild.roles.find(r => r.name === 'Helpers.');
    
		message.channel.send('- **تم قبول العضو بنجاح**');
		member.addRole(role);
    member.addRole(sup);
    
		c.send(`**» العضو :** ${mention}\n[ ${message.guild.emojis.find(r => r.name === 'greenTick')} ] :: لقد تم قبول العضو واعطائه رتبة سبورت`);
	} else if(args[0] === `${prefix}رفض`) {
		if(!message.member.roles.has('499973565211475978')) return message.channel.send('- **يجب عليك ان تكون من ادارة السيرفر**');
		if(!mention) {
			let m = await message.channel.send('- **منشن العضو الذي تريد رفضه**');
			message.delete().catch();
			return m.delete(5000);
		}

		let member = message.guild.member(mention);
		let c = message.guild.channels.get('499978004110245901');
		
		message.channel.send('- **تم رفض العضو بنجاح**');
		c.send(`**» العضو :** ${mention}\n[ ${message.guild.emojis.find(r => r.name === 'redTick')} ] :: لقد تم رفض العضو`);
	} else if(args[0] === `${prefix}js`) {
    try {
      if(!message.member.roles.has('477972887391698964')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`js\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('499987462479937567');
              let m = await c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كودز\n\`\`\`js\n${code}\`\`\`\n**${message.guild.emojis.find(r => r.name === 'terminal')} » وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'coding')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'creator')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}html`) {
    try {
      if(!message.member.roles.has('477972887391698964')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`html\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('499987527097122816');
              let m = await c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كودز\n\`\`\`html\n${code}\`\`\`\n**${message.guild.emojis.find(r => r.name === 'terminal')} » وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'coding')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'creator')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}py`) {
    try {
      if(!message.member.roles.has('477972887391698964')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`python\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('499987505278615557');
              let m = await c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كودز\n\`\`\`python\n${code}\`\`\`\n${message.guild.emojis.find(r => r.name === 'terminal')} **» وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'coding')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'creator')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}eris`) {
    try {
      if(!message.member.roles.has('477972887391698964')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 60000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`js\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {

              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('499988933631803392');
              let m = await c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كودز\n\`\`\`js\n${code}\`\`\`\n${message.guild.emojis.find(r => r.name === 'terminal')}** » وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'coding')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'creator')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}remove`) {
   if(!message.member.roles.has('477972887391698964')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
   if(!args[1]) return message.channel.send(`- **\`[ JS, PY, HTML, ERIS ]\` يجب ان تضع اللغة بعد الأمر**`);
   if(!args[1].toLowerCase() === 'js' && !args[1].toLowerCase() === 'eris' && !args[1].toLowerCase() === 'html' && !args[1].toLowerCase() === 'py') return message.channel.send('- **هذه اللغة غير موجودة بالسستم**');
   if(!args[2] || isNaN(args[2]) || (Array.from(args[2])).length > 18) return message.channel.send(`- **يجب عليك كتابة اي دي الروم بعد الأمر**`);
   let c;
   if(args[1].toLowerCase() === 'js') {
     c = hero.channels.get('499987462479937567');
   } else if(args[1].toLowerCase() === 'py') {
     c = hero.channels.get('499987505278615557');
   } else if(args[1].toLowerCase() === 'eris') {
     c = hero.channels.get('499988933631803392');
   } else if(args[1].toLowerCase() === 'html') {
     c = hero.channels.get('499987527097122816')
   }
 
   c.fetchMessage(args[2]).then(msg => {
     if(!msg.isMentioned(message.author)) return message.channel.send(`- **هذا الكود لم تقم بنشره**`);
     msg.delete().then(() => {
       message.channel.send('- **تم مسح الكود بنجاح**');
     }).catch(e => {
       if(e) return message.channel.send(`:white_small_square: **Error :: \`${e.message}\`**`);
     });
   }).catch(e => {
     if(e) return message.channel.send(`:white_small_square: **Error :: \`${e.message}\`**`);
   });
 } else if(args[0] === `${prefix}clear`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('- **أنت لا تملك الصلاحيات اللازمة**');
    message.delete().then(() => {
      let size = 0;
      if(!args[1]) size = 100;
      if(args[1] && !isNaN(args[1])) Math.round(size);
      if(size > 100) return message.channel.send('- لا يمكنك مسح اكثر من **100** رسالة');
      message.channel.fetchMessages().then(m => {
        message.channel.bulkDelete(size);
        message.channel.send(`- تم مسح **${m.size}** من الرسائل`).then(m => m.delete(5000));
      });
    }).catch();
  } else if(args[0] === `${prefix}bc`) {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('- **أنت لا تملك الصلاحيات اللازمة لأستخدام هذا الأمر**');
  if(!args[1]) return message.channel.send('- **يجب عليك كتابة الرسالة بعد الأمر**');

  let msgCount = 0;
  let errorCount = 0;
  let successCount = 0;
	let status;
	if(msgCount === message.guild.memberCount) {
		status = 'تم الإرسال';
	} else if(msgCount !== message.guild.memberCount) {
		status = 'جارى الارسال';
	}
  message.channel.send(`**- [ :bookmark: :: ${msgCount} ] ・عدد الرسائل المرسلة**\n**- [ :inbox_tray: :: ${successCount} ] ・عدد الرسائل المستلمة**\n**- [ :outbox_tray: :: ${errorCount} ]・عدد الرسائل الغير مستلمة\n- [ :white_small_square: :: ${status} ]・حالة الرسائل المرسلة**`).then(msg => {
    message.guild.members.forEach(g => {
      g.send(args.slice(1).join(' ')).then(() => {
        successCount++;
        msgCount++;
				if(!msg) return;
        msg.edit(`**- [ :bookmark: :: ${msgCount} ] ・عدد الرسائل المرسلة**\n**- [ :inbox_tray: :: ${successCount} ] ・عدد الرسائل المستلمة**\n**- [ :outbox_tray: :: ${errorCount} ]・عدد الرسائل الغير مستلمة\n- [ :white_small_square: :: ${status} ]・حالة الرسائل المرسل**`);
      }).catch(e => {
        errorCount++;
        msgCount++;
				if(!msg) return;
        msg.edit(`**- [ :bookmark: :: ${msgCount} ] ・عدد الرسائل المرسلة**\n**- [ :inbox_tray: :: ${successCount} ] ・عدد الرسائل المستلمة**\n**- [ :outbox_tray: :: ${errorCount} ]・عدد الرسائل الغير مستلمة\n- [ :white_small_square: :: ${status} ]・حالة الرسائل المرسل**`);
      });
    });
  });
} else if(args[0] === `${prefix}members`) {
  return message.channel.send(`\`Members\`: ${message.guild.memberCount}`);
}
});

hero.login(process.env.CREATIONS);
