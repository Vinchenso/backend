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

    expect(`${result[0]._id}`).toEqual(`${guest._id}`);
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

  test('should get by status', async () => {
    await db.models.guest.insertMany([
      {
        fullname: 'tester teser',
        attendance_status: 'INVITED',
      },
      {
        fullname: 'tester teser',
        attendance_status: 'ACCEPTED',
      },

      {
        fullname: 'teser3 jacks',
        attendance_status: 'ACCEPTED',
      },
      {
        fullname: 'teser4 parrow',
        attendance_status: 'DECLINED',
      },
    ]);

    const args = {
      status: 'DECLINED',
    };

    const results = await guestResolver.Query.guestsByStatus(null, args, db);
    expect(results.length).toEqual(1);
  });

  test('should update name', async () => {
    const guest = await db.models.guest.create({
      fullname: 'John Smit',
    });

    const args = {
      id: guest.id,
      firstname: 'Toe',
      lastname: 'Man',
    };

    const results = await guestResolver.Mutation.updateGuestName(null, args, db);
    expect(results.fullname).toEqual('Toe Man');
  });
});
