const db = require('../config/db');

// Toggle Dark Mode
exports.updateDarkMode = (req, res) => {
  const { id } = req.params;
  const { dark_mode } = req.body;

  const sql = "UPDATE users SET dark_mode = ? WHERE id = ?";
  db.query(sql, [dark_mode, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Error updating dark mode" });
    
    res.json({ success: true, message: "Dark mode updated" });
  });
};

// Example: Get User by ID (if needed)
exports.getUserById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching user" });
    
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
};
