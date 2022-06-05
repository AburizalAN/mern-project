const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

const fileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'images');
    },
    filename : (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    } 
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
} 

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data})
});


const uri = 'mongodb://admin:eVFARa2b0BfdC0Gi@cluster0-shard-00-00.zgovv.mongodb.net:27017,cluster0-shard-00-01.zgovv.mongodb.net:27017,cluster0-shard-00-02.zgovv.mongodb.net:27017/dbmern?ssl=true&replicaSet=atlas-fy4k1z-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen('4000', () => {
        console.log('connected to port 4000')
    });
});