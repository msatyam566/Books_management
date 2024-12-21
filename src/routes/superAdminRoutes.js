const express = require('express');
// const { addUser, approveBook } = require('../controllers/superAdminController');
const validateAccessToken = require('../middleware/validateAccessToken');
const roleMiddleware = require('../middleware/roleMiddleware');
const { addUser } = require('../controllers/superAdmin/addUser');
const { approveBook, getActivityLogs } = require('../controllers/superAdmin/approveBook');

const router = express.Router();

router.post('/add-user', validateAccessToken, roleMiddleware(['superadmin']), addUser);
router.put('/', validateAccessToken, roleMiddleware(['superadmin']), approveBook);
router.get('/activity',validateAccessToken,roleMiddleware(['superadmin']),getActivityLogs)


module.exports = router;
