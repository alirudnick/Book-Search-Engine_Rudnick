const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/BooksDB';

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.log('Failed to connect to MongoDB Atlas:', err);
  }
}

module.exports = connect;