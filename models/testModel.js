const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testModel = new Schema({
    title: {
        type: String
    },
    status: { type: String },
    executed: { type: Boolean}

});

module.exports = mongoose.model('Test', testModel);