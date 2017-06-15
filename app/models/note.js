var mongoose = require('mongoose');

module.exports = mongoose.model('noteModel', {
  sn: {
    type: String,
    default: '-'
  },
  cu: {
    type: String,
    default: '   '
  },
  fv: {
    type: String,
    default: '0'
  },
});
