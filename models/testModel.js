const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testModel = new Schema({
  testId: {
    type: String,
  },
  parentId: {
    type: String,
  },
  fullName: {
    type: String,
  },
  title: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  result: { type: String },
  output: { type: String },
  stackTrace: { type: String },
  steps: [{
    keyword: String,
    text: String,
    arguments: String,
    state: String,
    duration: String,
  }],
  suite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suite',
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });


module.exports = mongoose.model('Test', testModel);