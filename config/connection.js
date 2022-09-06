const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_DB || 'mongodb://localhost/socialnet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;