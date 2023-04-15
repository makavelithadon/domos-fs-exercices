const isValidWord = (word: string) => {
  if (!word || !/^[A-Za-z0-9]+$/.test(word)) {
    return false;
  }

  return true;
};

export { isValidWord };
