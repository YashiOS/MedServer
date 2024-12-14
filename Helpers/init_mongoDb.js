const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', err.message);
    console.error('Error stack:', err.stack);
  });

