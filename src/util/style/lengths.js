export const DEFAULT_SIZE = 16;

export const rem = (len) => {
  if (typeof len !== 'number') {
    throw new Error('rem only accepts Number input');
  }

  return len === 0 ? 0 : `${len / DEFAULT_SIZE}rem`;
};
