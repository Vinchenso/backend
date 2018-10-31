const { removeEmptyStrings } = require('../../utils.js');

module.exports = {
  Mutation: {
    createRSVP: async (_, args, { models }) => {
      const cleanArgs = removeEmptyStrings(args);
      if (cleanArgs.attendance_status === 'Yes') {
        cleanArgs.attendance_status = 'ACCEPTED';
      }
      if (cleanArgs.attendance_status === 'No') {
        cleanArgs.attendance_status = 'DECLINED';
      }

      console.log(cleanArgs);
      delete cleanArgs.name;
      const guest = await models.guest.findOneAndUpdate({ _id: args.name }, { ...cleanArgs }, { new: true }).exec();

      return guest;
    },
  },
};
