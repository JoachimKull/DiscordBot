# Basic Discord Bot

This repo contains a Discord bot which greets new users with a personal message and also let people add predefined roles to themselves. On top of that you are able to let the bot join your current voice channel and play a sound snippet of your choice.

For the easier use the 'discord.js' library is used. The bot also responds with guidance when it encounters an unknown command.

*Note: This Code is somehow poorly written because of code duplication (and maybe general flaws with JavaScript as it isn´t my strongest programming language). My main focus was to create a functioning bot for my own Discord Server.*

## Installation

If you want to use this bot you have to change a few lines for this program to work properly for your server.

- The login credentials given from Discord
- All the roles you want to define - those also have to be defined on your Discord
- The welcome message as it references certain text channels

When you've done all that you just have to ``npm install`` all the packages and run the bot with ``npm start``.

## Scripts

- ``npm start`` – launch the bot
- ``npm test`` – run lint checks and unit tests
- ``npm run lint`` – run the linter only

## Deployment

I'm self hosting this bot on a Raspberry Pi 3b with [noip](https://www.noip.com/) and [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) as they are fast to setup (just follow their instructions) and really easy to use. Noip is not mandatory but in case you want to run a little webpage to advertise your server it makes the process as easy as it can be.

### TODO

- [x] regex for auto answer if no known command was send (maybe a _startswith_ will do the job)
- [x] play with reactions - maybe send pm when roles were given
  - [x] add info in help command
- [ ] let admins define new roles - therefore we need a file which contains the known roles
- [x] add restriction for channels in which bot commands can be send in as well as a info message when in wrong channel
- [ ] add german welcome message?
