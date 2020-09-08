# Basic Discord Bot

This repo contains a Discord bot which greets new users with a personal message and also let people add predefined roles to themselves. On top of that you are able to let the bot join your current voicechannel and play a sound snippet of your choice.

For the easier use the 'discord.js' library is used.

*Note: This Code is somehow poorly written because of code duplication (and maybe general flaws with JavaScript as it isn´t my strongest programming language). My main focus was to create a functioning bot for my own Discord Server.*

## Installation

If you want to use this bot you have to change a few lines for this program to work properly for your server.

- The login credentials given from Discord
- All the roles you want to define - those also have to be defined on your Discord
- The welcome message as it references certain textchannels

When you've done all that you just have to ``npm install`` all the packages and run it with ``node main.js``.

## Deployment

I'm selfhosting this bot on a Raspberry Pi 3b with [noip](https://www.noip.com/) and [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) as they are fast to setup (just follow their instructions) and really easy to use. Noip is not mandatory but in case you want to run a little webpage to advertise your server it makes the process as easy as it can be.


### TODO

- [ ] regex for auto answer if no known command was send (maybe a _startswith_ will do the job)
- [ ] ~~!casino: Let Members earn points~~
- [ ] refactor code into functions
- [ ] play with reactions
- [ ] update to newest discordjs lib