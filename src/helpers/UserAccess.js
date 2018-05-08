export const getUserRoles = () => {
  const userInfo = JSON.parse(
    localStorage.getItem('user-info') || '{}'
  );
  let roles;
  if (userInfo && userInfo.realmAccess) {
    roles = userInfo.realmAccess.roles;
  }
  return roles;
};

export const userHasRole = role => {
  const roles = getUserRoles();
  return roles && roles.indexOf(role) >= 0;
};
