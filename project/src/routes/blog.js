const express = require('express');
const {body} = require('express-validator');

const router = express.Router();
const blogController = require('../controllers/blog')

router.post('/post', [
    body('title').isLength({min: 5}).withMessage('input tidak sesuai'), 
    body('body').isLength({min: 5}).withMessage('input tidak sesuai')
], blogController.createBlogPost);

router.get('/posts', blogController.getAllBlogPost);

router.get('/post/:postid', blogController.getBlogPostById);

router.put('/post/:postid', [
    body('title').isLength({min: 5}).withMessage('input tidak sesuai'), 
    body('body').isLength({min: 5}).withMessage('input tidak sesuai'),
], blogController.updateBlogPost);

router.delete('/post/:postid', blogController.deleteBlogPost);

module.exports = router;