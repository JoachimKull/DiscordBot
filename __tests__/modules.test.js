const EventEmitter = require('events');
const { registerCommands } = require('../src/commands');
const { registerReactionRoles } = require('../src/reactionRoles');
const { registerSounds } = require('../src/sounds');
const { Events } = require('discord.js');

class MockClient extends EventEmitter {}

describe('module registration', () => {
  test('registerCommands adds messageCreate handler', () => {
    const client = new MockClient();
    registerCommands(client);
    expect(client.listenerCount('messageCreate')).toBeGreaterThan(0);
  });

  test('registerReactionRoles adds necessary handlers', () => {
    const client = new MockClient();
    registerReactionRoles(client);
    expect(client.listenerCount('messageCreate')).toBeGreaterThan(0);
    expect(client.listenerCount(Events.MessageReactionAdd)).toBeGreaterThan(0);
    expect(client.listenerCount(Events.MessageReactionRemove)).toBe(0);
  });

  test('registerSounds adds messageCreate handler', () => {
    const client = new MockClient();
    registerSounds(client);
    expect(client.listenerCount('messageCreate')).toBeGreaterThan(0);
  });
});
