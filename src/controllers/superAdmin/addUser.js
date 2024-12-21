const bcrypt = require("bcryptjs");
const {userValidation}  = require("../../functions/validator");
const pool = require("../../config/db"); 
const  sendEmail  = require("../../config/email");

// This api is for add user and admin both if not send any value default will be user
exports.addUser = async (req, res) => {
  try {
    // Validate user input
    const { error } = await userValidation.validateAsync(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "user"]
    );

  

    await sendEmail(
      email,
      'Your account has been successfully. Please find credentials below Thanks',
      `Your email is ${email} and password is ${password} `,
    )

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};