const express = require('express');
const cors = require('cors');
const multer = require('multer')
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./connectDB.js');
const Book = require('./models/Books.js');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors()); 
app.use("/uploads", express.static("uploads"))

//mongoDB connection
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

app.get('/', (req,res) => {
    res.json("HEllo World");
})

app.get('/api/books', async(req, res) => {
    try {
        const category = req.query.category;

        const filter = {};
        if(category){
            filter.category = category;
        }
        const data = await Book.find(filter);
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "An error occurred while fetching books."});
    }
})


app.get('/api/book/:slug', async(req, res) => {
    try {
        const slugParams = req.params.slug;

        const data = await Book.findOne({slug: slugParams});
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "An error occurred while fetching books."});
    }
})

//add books

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
        }
    })
    
const upload = multer({ storage: storage })

app.post('/api/books', upload.single("thumbnail") , async(req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)

        const newBook = new Book({
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
            thumbnail: req.file.filename,
        });

        await Book.create(newBook);

        res.json("Data submitted")
    } catch (error) {
        res.status(500).json({error: "An error occurred while fetching books."});
    }
})

//update book 

app.put('/api/book', upload.single("thumbnail") , async(req, res) => {
    try {
        const bookId = req.body.bookId;

        const updatedBook = {
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
            // thumbnail: req.file.filename,
        };

        if(req.file){
            updatedBook.thumbnail = req.file.filename;
        }

        await Book.findByIdAndUpdate(bookId, updatedBook);

        res.json("Data submitted")
    } catch (error) {
        res.status(500).json({error: "An error occurred while fetching books."});
    }
})


//DELETE BOOK 
app.delete('/api/book/:id', async(req, res) => {
    try {
        const bookId = req.params.id;

        await Book.findByIdAndDelete({_id: bookId});
        res.json("Book removed!");
    } catch (error) {
        res.json(500).json({error: "Something went wrong!"});
    }
})



//for the path that not exits and it should alway be at the bottom of any path or routes
app.get('*', (req,res) => {
    res.sendStatus("404");
})
