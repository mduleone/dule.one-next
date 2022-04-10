export const getItem = (key) => {
  if (!window || !window.localStorage) {
    return null;
  }

  const rawValue = window.localStorage.getItem(key);
  return rawValue
    ? JSON.parse(rawValue, (k, v) => {
        if (k === 'quizInterval') {
          return v === 'Infinity' ? Infinity : v;
        }
        return v;
      })
    : '';
};

export const setItem = (key, blob) => {
  if (!window || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(
    key,
    JSON.stringify(blob, (k, v) => {
      if (k === 'quizInterval') {
        return v === Infinity ? 'Infinity' : v;
      }
      return v;
    }),
  );
};
