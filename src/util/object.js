export const removeValueUndefinedOrNull = (object) => {
  const cloneObject = { ...object };

  Object.keys(cloneObject).forEach((key) => {
    if (!cloneObject[key]) {
      delete cloneObject[key];
    }
  });

  return cloneObject;
};

export const Clone = (object) => {
  const stringObject = JSON.stringify(object);
  return JSON.parse(stringObject);
};

export default {
  removeValueUndefinedOrNull,
  Clone,
};
