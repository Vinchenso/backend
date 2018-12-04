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
          if (other.attending === 'Yes') {
            other.attendance_status = 'ACCEPTED';
          }
          if (other.attending === 'No') {
            other.attendance_status = 'DECLINED';
          }

          const otherModel = await models.guest
            .findOneAndUpdate(
              { _id: other.id },
              { submittedBy: args.name, attendance_status: other.attendance_status },
              { new: true }
            )
            .exec();
          guests.push(otherModel);
        });
      }

      if (args.spellCheck) {
        args.spellCheck.map(async guest => {
          if (guest.correctCheck === false) {
            await models.guest
              .findOneAndUpdate({ _id: guest.id }, { correctSpelling: guest.correctSpelling }, { new: true })
              .exec();
          }
        });
      }

      delete cleanArgs.name;
      const guest = await models.guest.findOneAndUpdate({ _id: args.name }, { ...cleanArgs }, { new: true }).exec();
      guests.push(guest);
      return guests;
    },
  },
};
