module.exports = {
  Query: {
    allGuests: async (_, __, { models }) => {
      const guests = await models.guest.find();
      return guests;
    }
  },
  Mutation: {
    createGuest: async (_, args, { models }) => {
      const guest = await models.guest.create(args);
      return guest;
    }
  }
};
