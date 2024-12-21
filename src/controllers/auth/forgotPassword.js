const crypto = require("crypto");
const pool = require("../../config/db");
const sendEmail = require("../../config/email");
const bcrypt = require("bcryptjs");

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        // Generate reset token and expiry this is temporary
        const token = crypto.randomBytes(32).toString("hex");
        const expiresTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        const refreshToken = " "

        // Here i can create a new schema but i did not

        // Remove any existing reset token for this user
        await pool.query("DELETE FROM tokens WHERE userId = ?", [
            user.id,
        ]);

        await pool.query(
            "INSERT INTO tokens (userId, token,refreshToken,expiresAt) VALUES (?, ?,?, ?)",
            [user.id, token,refreshToken,expiresTime]
        );

        // Send email with reset link
        const resetLink = `http://localhost:5000/api/auth/reset-password?token=${token}`;
        await sendEmail(
            email,
            "Password Reset Request",
            `Click the link to reset your password: ${resetLink}`
        );

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.error("Error requesting password reset:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.resetPassword = async (req, res) => {
    const {newPassword}  = req.body;
    const getToken = req.query.token;

    try {
        // Check if token is valid and not expired
        const [rows] = await pool.query(
            "SELECT * FROM tokens WHERE token = ?  AND expiresAt > ?",
            [getToken, new Date()]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const tokenDetails = rows[0];

      
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset token
        await pool.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, tokenDetails.userId]
        );

          // clear the temporary token for rest password
          await pool.query("DELETE FROM tokens WHERE id = ?", [
            tokenDetails.id,
        ]);

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};