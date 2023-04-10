const mongoose = require('mongoose');
const unicornSchema = new mongoose.Schema({
    name: String
});

const unicornModel = mongoose.model('unicorns', unicornSchema);

module.exports = unicornModel;