// Student name: wsiu11
// Student ID: 301272297
// Filename: books.js
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});


router.get('/details', (req, res, next) => {
  res.render('books/details', {
    title: 'Books',
    books: {}
  });
});

router.get('/details/:id', (req, res, next) => {
  // find all books in the books collection
  book.find({ _id: req.params.id }, (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      console.log(books);
      res.render('books/details', {
        title: 'Books',
        books: books[0]
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  // render the detail page
  res.render('books/details', {
    title: 'Books',
    books: {}
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  // create book
  book.create({ Title: req.body.title, Price: req.body.price, Author: req.body.author, Genre: req.body.genre }, function(err, small) {
    if (err) {
      return console.error(err);
    }
    console.log(small);
    res.redirect('/books');
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  // find book by id
  book.find({ _id: req.params.id }, (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      console.log(books);
      res.render('books/details', {
        title: 'Books',
        books: books[0]
      });
    }
  });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  // find book by id and update
  book.findOneAndUpdate({ _id: req.params.id }, { $set: { Title: req.body.title, Price: req.body.price, Author: req.body.author, Genre: req.body.genre } }).then((c) => {
    res.redirect('/books');
  }).catch(function (err) {
    console.log(err);
    res.redirect('/books');
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  // delete book by id
  book.deleteOne({_id: req.params.id}).then(function() {
    console.log("deleted");
    res.redirect('/books');
  });
});


module.exports = router;
