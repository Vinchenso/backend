function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
  }
}

const removeEmptyStrings = obj => {
  const newObj = {};
  Object.keys(obj).forEach(prop => {
    if (obj[prop] !== '') {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

exports.hasPermission = hasPermission;
exports.removeEmptyStrings = removeEmptyStrings;
