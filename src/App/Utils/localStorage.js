export const getUserData = () => {
  const ref = localStorage.getItem('user');
  const storage = ref ? JSON.parse(ref) : null;
  return storage;
};

export const getCurrentLocale = () => {
  const userData = getUserData();
  const currentLocale = userData ? JSON.parse(userData?.localization || {}) : null;
  return currentLocale;
};
