const db = require('../support/db.js');

describe.only('User', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  test('Query', async () => {});
});
