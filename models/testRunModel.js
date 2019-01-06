const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testRunModel = new Schema({
  executionDate: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });

module.exports = mongoose.model('testRun', testRunModel);