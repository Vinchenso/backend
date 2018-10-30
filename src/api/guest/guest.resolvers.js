module.exports = {
  Query: {
    allGuests: async (_, __, { models }) => {
      const guests = await models.guest.find();
      return guests;
    },
    guestsByStatus: async (_, args, { models }) => {
      const guests = await models.guest.find({ attendance_status: args.status });
      return guests;
    },
  },
  Mutation: {
    createGuest: async (_, args, { models }) => {
      const guest = await models.guest.create(args);
      return guest;
    },
    updateGuestName: async (_, args, { models }) => {
      const guest = await models.guest.findOneAndUpdate({ _id: args.id }, { ...args }, { new: true }).exec();
      return guest;
    },
  },
};
