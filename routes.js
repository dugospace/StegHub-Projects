// Use require('./models/book') to point to the file we just created: apps/models/book.js
const Book = require('./models/book'); 
const path = require('path');

module.exports = function(app) {
  // GET all books
  app.get('/book', async (req, res) => {
    try {
      // Find all documents in the 'Book' collection
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
  });

  // POST a new book
  app.post('/book', async (req, res) => {
    try {
      const book = new Book({
        name: req.body.name,
        isbn: req.body.isbn,
        author: req.body.author,
        pages: req.body.pages
      });
      // Save the new book document to MongoDB
      const savedBook = await book.save();
      res.status(201).json({
        message: 'Successfully added book',
        book: savedBook
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error adding book (Check ISBN/Pages)', error: err.message });
    }
  });

  // DELETE a book by ISBN
  app.delete('/book/:isbn', async (req, res) => {
    try {
      // Find one document by ISBN and delete it
      const result = await Book.findOneAndDelete({ isbn: req.params.isbn });
      
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      res.json({
        message: 'Successfully deleted the book',
        book: result
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
  });

  // Handle all other requests (sends the Angular index.html file)
  // FIX: Using '/*' for a generic catch-all route that serves the client application
  app.get('/*', (req, res) => {
    // This is the public folder in the root of the project
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
};
