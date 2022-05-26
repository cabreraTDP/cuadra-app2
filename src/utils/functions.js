const getProp = (obj, key) =>
key.split('.').reduce( (o, x) =>
                      (typeof o == "undefined" || o === null) ? o : o[x]
                      , obj);

module.exports = {getProp}