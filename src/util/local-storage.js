export const getItem = (key) => {
  if (!window || !window.localStorage) {
    return null;
  }

  const rawValue = window.localStorage.getItem(key);
  return rawValue ? JSON.parse(rawValue) : '';
};

export const setItem = (key, blob) => {
  if (!window || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(blob));
};
