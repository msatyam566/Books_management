const express = require('express');
const { purchaseBook, getBooksUser } = require('../controllers/user/userController');
const validateAccessToken = require('../middleware/validateAccessToken');


const router = express.Router();


router.post('/book', validateAccessToken, purchaseBook)
router.get('/books',getBooksUser)




module.exports = router;
