const EventEmitter = require('events');
const { registerCommands } = require('../src/commands');

describe('command responses', () => {
  test('responds to unknown commands with help hint', () => {
    class MockClient extends EventEmitter {}
    const client = new MockClient();
    registerCommands(client);

    const reply = jest.fn().mockReturnValue({ catch: jest.fn() });
    const message = {
      cleanContent: '!doesnotexist',
      channel: { id: 'bot' },
      author: 'user',
      member: {
        permissions: { has: () => true },
        guild: { channels: { cache: { find: () => 'bot' } } }
      },
      reply
    };

    client.emit('messageCreate', message);
    expect(reply).toHaveBeenCalledWith(expect.objectContaining({ content: expect.stringContaining('Unknown command') }));
  });
});
