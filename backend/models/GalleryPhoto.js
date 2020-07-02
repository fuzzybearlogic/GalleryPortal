const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GalleryPhoto = new Schema({
    GalleryPhotoId: { type: Schema.ObjectId },
    Galleryid: {type: String},
    GalleryPhotoTitle: { type: String, maxlength: 200 },
    GalleryPhotoDescription: { type: String, maxlength: 250 },
    GalleryPhotoImageData: { type: String },
    GalleryPhotoDateCreated: { type: Date }
}, { collection: 'GalleryPhotos' });

module.exports = mongoose.model('GalleryPhoto', GalleryPhoto);