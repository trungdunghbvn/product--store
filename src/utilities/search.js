var delayTimer;
export const doSearch = (text, callback) => {
  clearTimeout(delayTimer);
  delayTimer = setTimeout(function () {
    callback(text);
  }, 500);
};
