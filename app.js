const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://blogger1:marsisaplanet1@cluster0.xfcvy.mongodb.net/node-tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// --- middleware begin ---

// logging with morgan
app.use(morgan('dev'));
// serving static files
app.use(express.static('public'));
// url encoding - this parses the data into a workable format that we can use, it is what enables us to use 'req.body'
app.use(express.urlencoded({ extended: true }));

// --- middleware end ---


// serve some HTML files based on route
// home
app.get('/', (req, res) => {
    res.redirect('/blogs');    
});

// about
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});