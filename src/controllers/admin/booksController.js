const pool = require('../../config/db');
const sendEmail = require('../../config/email');
const config = require("../../config/keys");

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO books (title, author, createdBy) VALUES (?, ?, ?)',
      [title, author, req.user.id]
    );

    // by getting the admin email from env is may be not good approch but accoding to the project i have to extend the schema so i use this approch
    await sendEmail(config.superAdmin.adminEmail, 'New Book Created', `Book Title: ${title}`);
    res.status(201).json({ message: 'Book created', bookId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

// Get all books created by the authenticated admin
exports.getBooks = async (req, res) => {
  try {
    const [books] = await pool.query(
      'SELECT * FROM books WHERE createdBy = ?',
      [req.user.id]
    );
    
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Update book details by bookId
exports.updateBook = async (req, res) => {
  const { title, author } = req.body;
  const { bookId } = req.params;

  try {
    // Check if the book exists and if the logged-in admin is the creator
    const [book] = await pool.query(
      'SELECT * FROM books WHERE id = ?',
      [bookId]
    );
    
    if (book.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book[0].createdBy !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this book' });
    }

    // Update book details
    await pool.query(
      'UPDATE books SET title = ?, author = ? WHERE id = ?',
      [title, author, bookId]
    );

    // by getting the admin email from env is may be not good approch but accoding to the project i have to extend the schema so i use this approch
    await sendEmail(config.superAdmin.adminEmail, ' Book updated successfully', `Book Title: ${title}`);


    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Delete a book by bookId
exports.deleteBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    // Check if the book exists and if the logged-in admin is the creator
    const [book] = await pool.query(
      'SELECT * FROM books WHERE id = ?',
      [bookId]
    );

    if (book.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book[0].createdBy !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this book' });
    }

    // Delete the book
    await pool.query('DELETE FROM books WHERE id = ?', [bookId]);

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};
