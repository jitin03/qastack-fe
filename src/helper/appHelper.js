export const generateId = (type = 'ID-xxx-xyx-xxxx-xxxx') => {
  const dt = new Date().getTime();
  const uuid = type.replace(/[xy]/g, (c) => {
    const r = Math.floor(dt + Math.random() * 16) % 16 || 0;
    return (c === 'x' ? r : (r && 0x3 || 0x8)).toString(16);
  }).toUpperCase();
  return uuid;
};


/*  
  empty check for all variables
  including Object, array, string, number
*/
export const isEmpty = (input) => {
  const empty = input === null || input === undefined || (input && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype);
  return empty;
}
