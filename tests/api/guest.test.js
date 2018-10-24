const db = require('../support/db.js');
const guestResolver = require('../../src/api/guest/guest.resolvers.js');
const { runQuery } = require('../support/run.js');

describe.only('Guest', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  test('resolves correct data records', async () => {
    const guest = await db.models.guest.create({
      firstname: 'test',
      lastname: 'teser',
    });
    const result = await guestResolver.Query.allGuests(null, {}, db);

    expect(`${result[0]._id}`).toBe(`${guest._id}`);
  });

  test('resolves correct data count', async () => {
    await db.models.guest.insertMany([
      {
        firstname: 'test',
        lastname: 'teser',
        email: 'popper@jacks.com',
      },
      {
        firstname: 'test2',
        lastname: 'teser2',
        email: 'popper2@jacks.com',
      },
    ]);

    const results = await guestResolver.Query.allGuests(null, {}, db);
    expect(results.length).toEqual(2);
  });

  test('should have correct query', async () => {
    await db.models.guest.create({
      firstname: 'test',
      lastname: 'teser',
    });

    const input = {};

    const query = `
          {
            allGuests {
              firstname
            }
          }
        `;
    const { data, errors } = await runQuery(query, input, db);

    expect(errors).toBeUndefined;
    expect(data.allGuests[0].firstname).toEqual('test');
  });
});
