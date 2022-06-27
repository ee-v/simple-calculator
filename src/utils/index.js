const extract = (formula) => {
  return formula.slice(0, -1);
};

const lastChar = (formula) => {
  return formula[formula.length - 1];
};
export {
  extract,
  lastChar
};