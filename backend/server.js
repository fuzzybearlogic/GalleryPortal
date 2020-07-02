const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

   const galleryRoute = require('./routes/gallery.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/galleries', galleryRoute);
    const port = process.env.PORT || 4000;

    // file upload bit
    app.use('/public', express.static('public'));
    app.use('/api', galleryRoute)


    // Error favicon.ico
    // app.get('/favicon.ico', (req, res) => res.status(204));

    const server = app.listen(port, () => {
     console.log('Listening on port ' + port);
    });

    // Error
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});