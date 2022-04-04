/**
 * Greet all new members
 * @param {*} member object from which all needed information will be retrieved
 */
exports.welcomeMessage = function welcomeMessage(member) {
    var guild = member.guild;
    var name = member.user.username;
    var id = member.user.id;

    if (guild.systemChannel) {
        /*
            guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
            .setTitle("A new user joined") // Calling method setTitle on constructor.
            .setDescription(memberTag + " has joined the guild") // Setting embed description
            .setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
            .addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
            .setTimestamp() // Sets a timestamp at the end of the embed
            );
        */
        console.log('The user: ' + name + ' joined the Server');

        const channelHow = guild.channels.cache.find(channel => channel.name === '❔how-to');
        //var adminLink = guild.roles.cache.find(role => role.name === 'Admin');
        const welcomeMessageGer = 'Hallo <@' + id + '>, schön dich kennenzulernen! \nDie Verwendung einer Rolle auf diesem Server ist **unumgänglich**. Du kannst dir selbst eine Rolle unter <#' + channelHow + '> aussuchen, indem du auf das jeweilige Emoji reagierst. \n**Nur mit der Rolle** sind die jeweiligen **Channels sichtbar**. \nBitte lies dir unsere Regeln durch und für weitere Informationen die **gepinnten Nachrichten** in jedem unserer Textchannels :) \n';
        const welcomeMessageEng = 'Hello <@' + id + '>, nice to meet you! \nUsing a role on this server is **inevitable**, you can add it yourself in <#' + channelHow + '> by reacting on the specific emoji. Only with the role the specific Channels are visible. \nPlease read our rules and for additional information checkout the **pinned messages** in each of our text channels. :) \n';

        guild.systemChannel.send(welcomeMessageGer + "\n" + welcomeMessageEng).catch((e) => { console.log(e); });
        //guild.systemChannel.send(welcomeMessageEng).catch((e) => { console.log(e); });
    }
}

/**
 * Notify about leaving members
 * @param {*} member object from which all needed information will be retrieved
 * @param {*} notificationChannel channel in which the notification will be sent in
 */
exports.alertGuildMemberLeave = function alertGuildMemberLeave(member, notificationChannel) {
    var userID = member.id;
    var userName = member.user.username;

    const adminChat = member.guild.channels.cache.find(channel => channel.name === notificationChannel);
    console.log('The user: ' + userName + ' with ID: ' + userID + ' left the Server');

    adminChat.send('The user: ' + userName + ' with ID: ' + userID + ' left the Server');
}