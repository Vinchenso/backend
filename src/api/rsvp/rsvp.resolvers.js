const { removeEmptyStrings } = require('../../utils.js');

module.exports = {
  Mutation: {
    createRSVP: async (_, args, { models }) => {
      const guests = [];

      const cleanArgs = removeEmptyStrings(args);

      if (cleanArgs.attendance_status === 'Yes') {
        cleanArgs.attendance_status = 'ACCEPTED';
      }
      if (cleanArgs.attendance_status === 'No') {
        cleanArgs.attendance_status = 'DECLINED';
      }

      if (args.others) {
        args.others.map(async other => {
          if (other.attendance_status === 'Yes') {
            other.attendance_status = 'ACCEPTED';
          }
          if (other.attendance_status === 'No') {
            other.attendance_status = 'DECLINED';
          }

          const otherModel = await models.guest
            .findOneAndUpdate({ _id: other.id }, { attendance_status: other.attendance_status }, { new: true })
            .exec();
          guests.push(otherModel);
        });
      }

      delete cleanArgs.name;
      const guest = await models.guest.findOneAndUpdate({ _id: args.name }, { ...cleanArgs }, { new: true }).exec();
      guests.push(guest);
      return guests;
    },
  },
};
