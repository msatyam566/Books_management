const pool = require('../config/db');

async function logActivity(userId, activity) {
    try {
        await pool.query(
            'INSERT INTO activity_logs (userId, activity) VALUES (?, ?)',
            [userId, activity]
        );
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}

module.exports = logActivity;
