const db = require('../support/db.js');
const rsvpResolver = require('../../src/api/rsvp/rsvp.resolvers.js');

describe('RSVP', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  describe('Mutations', () => {
    test('#createRSVP - should update guest email', async () => {
      const guest = await db.models.guest.create({
        fullname: 'John Smit',
      });

      const args = {
        email: 'test@test.com',
        name: guest._id,
        cell: '13456789',
        notes: 'I eat everything',
        attendance_status: 'Yes',
      };

      const results = await rsvpResolver.Mutation.createRSVP(null, args, db);

      const updatedGuest = await db.models.guest.findById(guest.id);
      expect(updatedGuest.email).toEqual('test@test.com');
      expect(updatedGuest.cell).toEqual('13456789');
      expect(updatedGuest.notes).toEqual('I eat everything');
      expect(results._id).toEqual(guest._id);
    });

    test('#createRSVP - should not update blank guest attributes', async () => {
      const guest = await db.models.guest.create({
        fullname: 'John Smit',
        email: 'dnt@gmail.com',
      });

      const args = {
        email: '',
        name: guest._id,
        cell: '13456789',
        notes: '',
        attendance_status: 'Yes',
      };

      const results = await rsvpResolver.Mutation.createRSVP(null, args, db);

      const updatedGuest = await db.models.guest.findById(guest.id);
      expect(updatedGuest.attendance_status).toEqual('ACCEPTED');
      expect(updatedGuest.email).toEqual('dnt@gmail.com');
      expect(updatedGuest.cell).toEqual('13456789');
      expect(updatedGuest.notes).toBeFalsy();
      expect(results._id).toEqual(guest._id);
    });
  });
});
