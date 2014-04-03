var util = require('./util');

module.exports = {
  renderFile: function (path, options, callback) {
    return 'hello';
  },
  __express: function (path, options, callback) {
    this.renderFile(path, options, callback);
  }
};

