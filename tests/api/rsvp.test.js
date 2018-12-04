const db = require('../support/db.js');
const rsvpResolver = require('../../src/api/rsvp/rsvp.resolvers.js');

describe('RSVP', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  describe('Mutations', () => {
    test('#createRSVP - should update other guest statuses', async () => {
      const guest1 = await db.models.guest.create({
        fullname: 'John Smit',
      });

      const guest2 = await db.models.guest.create({
        fullname: 'Paul second',
      });

      const guest3 = await db.models.guest.create({
        fullname: 'Jack Door',
      });

      const args = {
        email: '',
        name: guest1._id,
        cell: '',
        dietary_note: '',
        attendance_status: 'Yes',
        others: [{ id: guest2._id, attendance_status: 'Yes' }, { id: guest3._id, attendance_status: 'No' }],
      };

      const results = await rsvpResolver.Mutation.createRSVP(null, args, db);
      console.log(results);
    });

    test('#createRSVP - should update guest email', async () => {
      const guest = await db.models.guest.create({
        fullname: 'John Smit',
      });

      const args = {
        email: 'test@test.com',
        name: guest._id,
        cell: '13456789',
        dietary_note: 'I eat everything',
        attendance_status: 'Yes',
      };

      const results = await rsvpResolver.Mutation.createRSVP(null, args, db);

      const updatedGuest = await db.models.guest.findById(guest.id);
      expect(updatedGuest.email).toEqual('test@test.com');
      expect(updatedGuest.cell).toEqual('13456789');
      expect(updatedGuest.dietary_note).toEqual('I eat everything');
      expect(results[0]._id).toEqual(guest._id);
    });

    test('#createRSVP - should not update blank guest attributes', async () => {
      const guest = await db.models.guest.create({
        fullname: 'John Smit',
        email: 'dnt@gmail.com',
      });

      const args = {
        name: guest._id,
        cell: '13456789',
        attendance_status: 'Yes',
      };

      const results = await rsvpResolver.Mutation.createRSVP(null, args, db);

      const updatedGuest = await db.models.guest.findById(guest.id);
      expect(updatedGuest.attendance_status).toEqual('ACCEPTED');
      expect(updatedGuest.email).toEqual('dnt@gmail.com');
      expect(updatedGuest.cell).toEqual('13456789');
      expect(updatedGuest.notes).toBeFalsy();
      expect(results[0]._id).toEqual(guest._id);
    });

    test('#createRSVP - should update all guest statuses', async () => {
      const guest1 = await db.models.guest.create({
        fullname: 'John Smit',
      });

      const guest2 = await db.models.guest.create({
        fullname: 'Paul second',
      });

      const guest3 = await db.models.guest.create({
        fullname: 'Jack Door',
      });

      const args = {
        email: 'jsmit@easy.com',
        name: guest1._id,
        cell: '072 515 5155',
        song_note: 'baby',
        dietary_note: 'Seafood',
        attendance_status: 'Yes',
        others: [{ id: guest2._id, attending: 'Yes' }, { id: guest3._id, attending: 'No' }],
        spellCheck: [
          {
            fullname: guest1.fullname,
            id: guest1._id,
            correctSpelling: 'Vinnie K',
            correctCheck: false,
          },
          {
            fullname: guest2.fullname,
            id: guest2._id,
            correctSpelling: '',
            correctCheck: true,
          },
          {
            fullname: guest3.fullname,
            id: guest3._id,
            correctSpelling: '',
            correctCheck: true,
          },
        ],
      };

      const results = await rsvpResolver.Mutation.createRSVP(null, args, db);
      console.log(results);
      const resultGuest3 = results[0];
      const resultGuest2 = results[1];
      const resultGuest1 = results[2];

      expect(resultGuest3.attendance_status).toEqual('DECLINED');
      expect(resultGuest3.submittedBy).toEqual(guest1._id);

      expect(resultGuest2.attendance_status).toEqual('ACCEPTED');
      expect(resultGuest2.submittedBy).toEqual(guest1._id);

      expect(resultGuest1.attendance_status).toEqual('ACCEPTED');
      expect(resultGuest1.song_note).toEqual('baby');
      expect(resultGuest1.dietary_note).toEqual('Seafood');
      expect(resultGuest1.cell).toEqual('072 515 5155');
      expect(resultGuest1.email).toEqual('jsmit@easy.com');
      expect(resultGuest1.correctSpelling).toEqual('Vinnie K');
    });
  });
});
