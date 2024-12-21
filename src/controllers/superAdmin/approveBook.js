const sendEmail = require("../../config/email");
const pool = require("../../config/db"); 

exports.approveBook = async (req, res) => {
  const { bookId, status } = req.body;
  try {
    if (status === 'approved') {
      await pool.query('UPDATE books SET approved = 1 WHERE id = ?', [bookId]);
    } else {
      const [book] = await pool.query('SELECT createdBy FROM books WHERE id = ?', [bookId]);
      const [user] = await pool.query('SELECT email from users WHERE id = ?', book[0].createdBy)
      await sendEmail(user[0].email, 'Book Rejected', 'Your book has been rejected.');
    }
    res.json({ message: "Book status updated successfully" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error updating book status', error });
  }
};


exports.getActivityLogs = async (req, res) => {
  try {
      const [logs] = await pool.query(
          'SELECT * FROM activity_logs WHERE userId = ? ORDER BY timestamp DESC',
          [req.user.id]
      );

      res.status(200).json({ logs });
  } catch (error) {
      console.error('Error fetching activity logs:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};