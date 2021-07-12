const express = require('express');
const app = express();
const morgran = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogCont = require('./controller/blogController')
// Connecting to mongo db
const dbURI =  'mongodb+srv://Alaref:uUYZcvwrlmYFGXJK@cluster0.n9u2f.mongodb.net/database?retryWrites=true&w=majority'
mongoose.connect(dbURI , { useNewUrlParser: true ,  useUnifiedTopology: true } )
    .then(result => app.listen(3000))
    .catch(err => console.log(err))

app.set('view engine' , 'ejs');

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}));

app.use(morgran('dev'))

app.use((req,res , next) => {
    console.log('---------- NEW REQUEST MADE ----------');
    next();
});

app.get('/' , (req,res) => {
    res.redirect('/blogs')
});

app.get('/about' , (req,res) => {
    res.render('about');
});

// Blog pages
app.get('/blogs' , blogCont.blog_index )

app.get('/blogs/create' , blogCont.blog_create_get );

app.get('/blogs/:id', blogCont.blog_details)

app.delete('/blogs/:id', blogCont.blog_delete )

app.post('/blogs' , blogCont.blog_create_post)


app.use( (req, res) => {
    res.status(404).render('404');
});