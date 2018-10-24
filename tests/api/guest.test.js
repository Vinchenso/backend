const db = require('../support/db.js');
const guestResolver = require('../../src/api/guest/guest.resolvers.js');

describe.only('User', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  test('Query', async () => {
    const guest = await db.models.guest.create({
      firstname: 'test',
      lastname: 'teser'
    });
    const result = await guestResolver.Query.allGuests(null, {}, db);

    expect(`${result[0]._id}`).toBe(`${guest._id}`);
    // expect(0).toBe(0);
  });
});
