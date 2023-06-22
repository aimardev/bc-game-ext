export const StorageAPI = {
  set: function (key, data) {
    localStorage.setItem(key, data);
  },
  get: function (key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data || '{}');
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
};
