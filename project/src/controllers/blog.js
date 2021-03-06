const {validationResult} =require('express-validator');
const path = require('path');
const fs = require('fs');
const BlogPost = require('../models/blog');


exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file) {
        const err = new Error('Image harus diupload');
        err.errorStatus = 422;
        err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Posting = new BlogPost({
        title : title,
        body : body,
        image : image,
        author : {uid: 1, name: 'Aburizal Adi Nuroho'}
    });

    Posting.save()
    .then(result => {
        res.status(201).json({
            message : "Blog Post Berhasil dibuat",
            data : result
        });
    })
    .catch(err => console.log('error : ', err));
};

exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalData; 

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalData = count;
        return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil dipanggil',
            data: result,
            total_items: totalData,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err => {
        next(err)
    })
};

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postid;
    BlogPost.findById(postId)
    .then(result => {
        if(!result) {
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }
        res.status(200).json({
            message: 'data BlogPost berhasil dipanggil',
            data: result,
        });
    })
    .catch(err => {
        next(err);
    })
};

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file) {
        const err = new Error('Image harus diupload');
        err.errorStatus = 422;
        err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postid;

    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'update Blog Post Sukses',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
};

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postid;
    
    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        };

        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId)
    })
    .then(result => {
        res.status(200).json({
            message: "Hapus Blog Berhasil",
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
};

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}