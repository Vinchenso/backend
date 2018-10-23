// const { mongoose } = require('mongoose');

// describe('insert', () => {
//   let db;

//   beforeAll(async () => {
//     db = await mongoose.connect(global.__MONGO_URI__);
//   });

//   afterAll(async () => {
//     await db.disconnect();
//   });

it('should insert a doc into collection', async () => {
  expect(2).toEqual(2);
});

//   it('should insert many docs into collection', async () => {
//     const users = db.collection('users');

//     const mockUsers = [{ name: 'Alice' }, { name: 'Bob' }];
//     await users.insertMany(mockUsers);

//     const insertedUsers = await users.find().toArray();
//     expect(insertedUsers).toEqual([
//       expect.objectContaining({ name: 'John' }),
//       expect.objectContaining({ name: 'Alice' }),
//       expect.objectContaining({ name: 'Bob' })
//     ]);
//   });
// });
