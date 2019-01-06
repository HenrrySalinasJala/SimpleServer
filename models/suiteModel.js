const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const suiteModel = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  runId: {
    type: String,
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });

module.exports = mongoose.model('Suite', suiteModel);