// Routine for adding roles //
// ------------------------- //

export function addRole(roleName) {

    // TODO: Find role - not case sensitive
    var role = message.guild.roles.find(role => role.name === "ApexPlayers");

    if (role === null) {
        console.log(message.member.user.username + " tried to get a non existing role - atleast on this server");
        message.channel.send("Hm...it seems that I know this role but this server does not...").catch((e) => { console.log(e); });
        return;
    }

    // TODO: Replace roles with variables
    message.channel.send('You requested to be an ApexPlayer...').catch((e) => { console.log(e); });
    var strpd_role = role.toString().replace(/\D/g, "");

    // Check if member has role
    if (message.member.roles.has(strpd_role)) {
        console.log(message.member.user.username + " already has the role: " + role.name);
        message.channel.send("NANI?!... you already have the role: ApexPlayer").catch((e) => { console.log(e); });
    } else {
        message.member.addRole(role);
        console.log(message.member.user.username + " added himself the role: " + role.name);
        message.channel.send("Have fun with your new role: " + message.member.user.username).catch((e) => { console.log(e); });
    }
}

if (message.content.toLowerCase().startsWith("!addrole:")) {
    try {
        addRole(message.content.toLowerCase());
    } catch (error) {
        console.log("Unknown input for adding role: " + message);
    }
}