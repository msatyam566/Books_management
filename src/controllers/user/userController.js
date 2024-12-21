const pool = require('../../config/db');
const  sendEmail  = require('../../config/email');
const config = require("../../config/keys");

exports.purchaseBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    // Check if the book exists
    const [book] = await pool.query('SELECT * FROM books WHERE id = ?', [bookId]);
  

    if (book.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const sendBookId = book[0].id

    // Record the purchase in the purchase_details table
    const [result] = await pool.query(
      'INSERT INTO purchase_details (userId, bookId, activity) VALUES (?, ?, ?)',
      [req.user.id, sendBookId, 'Purchased']
    );

    const bookDetails = book[0]

    await sendEmail(config.superAdmin.adminEmail, ' Purchase details of books that sold', `Book Title: ${bookDetails.title}`);

    res.status(201).json({ message: 'Book purchased successfully',result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing purchase', error });
  }
};


exports.getBooksUser = async (req, res) => {
    try {
      const [approvedBooks] = await pool.query(
        'SELECT * FROM books WHERE approved = 1'
      );
  
      res.status(200).json({ message: 'Approved books fetched successfully', books: approvedBooks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching approved books', error });
    }
  };
