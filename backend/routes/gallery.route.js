const express = require('express');
const app = express();
const galleryRoutes = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');

// multer file storage
const DIR = './public/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// multer mime type
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg formats allowed!'));
    }
  }
});


// Require Product model in our routes module
let Gallery = require('../models/Gallery');
let GalleryPhoto = require('../models/GalleryPhoto');

// Defined store route
galleryRoutes.route('/create').post(function (req, res) {
  let gallery = new Gallery(req.body);
  gallery.save()
    .then(gallery => {
      res.status(200).json({'Gallery': 'Gallery has been created successfully'});
    })
    .catch(err => {
    res.status(400).send("Unable to save to database");
    });
});

// Defined get data(index or listing) route
galleryRoutes.route('/').get(function (req, res) {
  Gallery.find(function (err, galleries){
    if(err){
      console.log(err);
    }
    else {
      res.json(galleries);
    }
  });
});

// Defined edit route
galleryRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Gallery.findById(id, function (err, gallery){
      res.json(gallery);
  });
});

galleryRoutes.route('/update/:id').put(function (req, res) {
  Gallery.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Gallery with id=${req.params.id}.`
      });
    } else {
     res.send({ message: "Gallery Updated."})   ;
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Gallery with id=" + req.params.id
    })
  })
})

// Delete Gallery
galleryRoutes.delete("/delete/:id", (req, res, next) => {
  Gallery.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Gallery with id=${id}.`
        });
      } else {
        res.send({
          message: "Gallery was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Gallery picture with id=" + req.params.id
      });
    });
  });

//
galleryRoutes.post('/uploadphoto', upload.single('GalleryPhotoImageData'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const galleryphoto = new GalleryPhoto({
    _id: new mongoose.Types.ObjectId(),
    Galleryid: req.body.Galleryid,
    GalleryPhotoTitle: req.body.GalleryPhotoTitle,
    GalleryPhotoDescription: req.body.GalleryPhotoDescription,
    GalleryPhotoDateCreated: req.body.GalleryPhotoDateCreated,
    GalleryPhotoImageData: url + '/public/' + req.file.filename
  });
  galleryphoto.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Picture saved successfully!",
      userCreated: {
        _id: result._id,
        GalleryPhotoTitle: result.GalleryPhotoTitle,
        GalleryPhotoImageData: result.GalleryPhotoImageData
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  });
});

galleryRoutes.get('/allphotos/:message', (req, res, next) => {
GalleryPhoto.find({ Galleryid : req.params.message})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  })

galleryRoutes.delete('/deletephoto/:id', (req, res, next) => {
  GalleryPhoto.findByIdAndDelete(req.params.id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete picture with id=${id}.`
      });
    } else {
      res.send({
        message: "Picture was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete picture with id=" + req.params.id
    });
  });
});

module.exports = galleryRoutes;