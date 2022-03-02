# Basic Discord Bot

This repo contains a Discord bot which greets new users with a personal message and also let people add predefined roles to themselves. On top of that you are able to let the bot join your current voice channel and play a sound snippet of your choice.

For the easier use the 'discord.js' library is used.

*Note: This Code is somehow poorly written because of code duplication (and general flaws with JavaScript as it isn´t my strongest programming language). My main focus was to create a functioning bot for my own Discord Server.*

## Installation

If you want to use this bot you have to change a few lines for this program to work properly for your server.

- The login credentials given from Discord
- All the roles you want to define - those also have to be defined on your Discord
- The welcome message as it references certain text channels

When you've done all that you just have to ``npm install`` all the packages and run it with ``node main.js``.

## Deployment

I'm self hosting this bot on a Raspberry Pi 3b with [noip](https://www.noip.com/) and [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) as they are fast to setup (just follow their instructions) and really easy to use. Noip is not mandatory but in case you want to run a little webpage to advertise your server it makes the process as easy as it can be.

### TODO

- [ ] Create a diagram or similar to give an easier overview of all the functionalities
- [ ] Refactor/rewrite the code base so that it is modular and easier to refactor in the future
  - [ ] Remove legacy code
  - [ ] Getting user info/ids for message, channel, guild
  - [ ] Message transformation to lowercase handled in one place
  - [ ] Reaction role add/remove as well as the known role array
    - [ ] Init command (!react)
  - [ ] Sound snippets
    - [ ] Streaming of YT videos?
  - [ ] Welcome message and help
- [ ] Make the code asynchronous
- [ ] Regex for auto answer if no known command was send (maybe a *startswith* will do the job)
- [ ] Let admins define new roles - therefore we need a file or database which contains the known roles together with the permissions vector (maybe this vector can be retrieved from discord)
- [ ] Rebranding to DumpyFruit Bot?
