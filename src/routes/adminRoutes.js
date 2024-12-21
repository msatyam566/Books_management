const express = require('express');
const { createBook,getBooks, updateBook, deleteBook } = require('../controllers/admin/booksController');
const validateAccessToken = require('../middleware/validateAccessToken');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();


router.post('/book', validateAccessToken, roleMiddleware(["admin"]), createBook)
router.get('/books', validateAccessToken, roleMiddleware( ["admin"]),getBooks)
router.put('/book/:bookId',validateAccessToken, roleMiddleware( ["admin"]),updateBook)
router.delete('/book/:bookId',validateAccessToken, roleMiddleware( ["admin"]),deleteBook)




module.exports = router;
