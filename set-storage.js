(function execute(params) {
  var values = params || {};
  Object.keys(values).forEach((key) => {
    localStorage.setItem(key, values[key]);
  });
  return 'Headers pasted';
})(params);
