const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testRunModel = new Schema({
  runId: {
    type: String,
  },
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

module.exports = mongoose.model('TestRun', testRunModel);
