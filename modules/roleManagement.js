//TODO: Add comments

exports.addRole = function addRole(member, roleToAdd) {
    var guildRole = reaction.message.guild.roles.cache.find(role => role.name === roleToAdd);
    member.roles.add(guildRole);
    console.log(member.user.username + ' added himself the role: ' + role.name);
}

exports.removeRole = function removeRole(member, roleToRemove) {
    var guildRole = reaction.message.guild.roles.cache.find(role => role.name === roleToRemove);
    member.roles.remove(guildRole);
    console.log(member.user.username + ' removed himself the role: ' + role.name);
}

exports.hasRole = function hasRole(member, roleToCheck) {
    // .some returns boolean by default
    return member.roles.cache.some(role => role.name === roleToCheck);
}