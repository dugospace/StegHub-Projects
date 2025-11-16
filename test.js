const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require ('mongoose');
    const path = require('path');

    const app = express();
    const PORT = process.env.PORT || 3300;

    // MongoDB connection
    // NOTE: For modern mongoose, useNewUrlParser and useUnifiedTopology are typically unnecessary/ignored.
    mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    // Middleware to serve static files (like Angular client) and parse JSON
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());

    // Include the routes defined in the separate file
    require('./apps/routes')(app);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server up: http://localhost:${PORT}`);
    });
    