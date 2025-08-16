const { roles } = require('../config/roles');

describe('roles configuration', () => {
  test('each role has a name and emoji', () => {
    for (const [key, value] of Object.entries(roles)) {
      expect(typeof value.name).toBe('string');
      expect(typeof value.emoji).toBe('string');
    }
  });

  test('role names are unique', () => {
    const names = Object.values(roles).map(r => r.name);
    expect(new Set(names).size).toBe(names.length);
  });

  test('emoji names are unique', () => {
    const emojis = Object.values(roles).map(r => r.emoji);
    expect(new Set(emojis).size).toBe(emojis.length);
  });
});
