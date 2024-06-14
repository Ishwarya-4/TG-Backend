const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  emailName: {
    type: String,
    required: true,
    trim: true,
  },
  sendDate: {
    type: Date,
    required: true,
  },
  region: {
    type: String,
    required: true,
    trim: true,
  },
  productGroup: {
    type: String,
    required: true,
    trim: true,
  },
  assignee: {
    type: String,
    required: true,
    trim: true,
  },
  crossovers: {
    type: [String],
    default: [],
  },
  limitExceeded: {
    type: Boolean,
    default: false,
  },
  regionCounts: {
    type: Map,
    of: Number,
    default: {
      WW: 0,
      APJ: 0,
      AMS: 0,
      INTL: 0,
    },
  },
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
