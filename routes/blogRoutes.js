const express = require('express');
const blogCont = require('../controller/blogController');
const router = express.Router();



router.get('/blogs' , blogCont.blog_index );

router.get('/blogs/create' , blogCont.blog_create_get );

router.get('/blogs/:id', blogCont.blog_details);

router.delete('/blogs/:id', blogCont.blog_delete);

router.post('/blogs' , blogCont.blog_create_post);

module.exports = router;

