const bcrypt = require("bcryptjs");
const { loginValidation } = require("../../functions/validator");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../functions/generateToken");
const pool = require("../../config/db"); 
const config = require("../../config/keys");

exports.loginUser = async (req, res) => {
  try {
    // Validate login input
    const { error } = await loginValidation.validateAsync(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    // Check if the user exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = rows[0];

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    // Generating JWT tokens
    const jwtPayload = { id: user.id, role: user.role };
    const accessToken = generateAccessToken(jwtPayload, config.jwt.accessTokenLife);
    const refreshToken = generateRefreshToken(jwtPayload, config.jwt.refreshTokenLife);

    // Implementing single session system
    // Check and remove any existing refresh token for the user
    await pool.query("DELETE FROM tokens WHERE userId = ?", [user.id]);

    // Storing the new refresh token in the database
    await pool.query(
      "INSERT INTO tokens (userId, token, refreshToken) VALUES (?, ?, ?)",
      [user.id, accessToken, refreshToken]
    );

    // Set the refresh token as an HTTP-only cookie
    res
      .status(200)
      .cookie("auth", refreshToken, { httpOnly: true })
      .json({ accessToken, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
