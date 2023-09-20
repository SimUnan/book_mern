const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unqiue: true
    },
    slug: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    thumbnail: {
        type: String,
        // require: true
    },
    stars: {
        type: Number,
        unqiue: true,
        // required: true,
    },
    category: {
        type: Array,
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Book', BookSchema);