export const StorageAPI = {
  set: function (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  get: function (key) {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
};
