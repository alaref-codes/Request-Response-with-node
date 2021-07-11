const express = require('express');
const app = express();
const morgran = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
var bodyParser = require('body-parser');

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

app.get('/blogs' , (req,res) => {
    Blog.find().sort({createdAt: -1})
        .then( result => res.render('index' , {title: 'Home' , blogs: result }))
        .catch(err => console.log(err))
})

app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('detail' , { title: `Detail ${id}`  , blog: result})
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/blogs' , (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then( result => res.redirect('/blogs')  )
        .catch(err => console.log(err))

})

app.get('/blogs/create' , (req,res) => {
    res.render('create')
});

app.use( (req, res) => {
    res.status(404).render('404');
});