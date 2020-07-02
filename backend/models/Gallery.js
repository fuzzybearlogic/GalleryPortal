const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gallery = new Schema({
    GalleryId: { type: Schema.ObjectId },
    GalleryTitle: { type: String, maxlength: 200 },
    GalleryDescription: { type: String, maxlength: 500 },
    GalleryLocation: { type: String, maxlength: 500 },
    GalleryDateCreated: { type: Date }
}, { collection: 'Galleries' });

module.exports = mongoose.model('Gallery', Gallery);