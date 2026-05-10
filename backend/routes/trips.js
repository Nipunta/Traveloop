const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all trips for a user
router.get("/", (req, res) => {
  const { user_id } = req.query;
  const sql = user_id ? "SELECT * FROM trips WHERE user_id = ?" : "SELECT * FROM trips";
  const params = user_id ? [user_id] : [];
  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST create trip
router.post("/", (req, res) => {
  const { user_id, name, destination, start_date, end_date, cover_image, budget, travelers, status, description, privacy } = req.body;
  db.query(
    "INSERT INTO trips (user_id, name, destination, start_date, end_date, cover_image, budget, spent, travelers, status, description, privacy) VALUES (?,?,?,?,?,?,?,0,?,?,?,?)",
    [user_id, name, destination || "TBD", start_date, end_date, cover_image, budget || 0, travelers || 1, status || "upcoming", description, privacy || "private"],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// PUT update trip
router.put("/:id", (req, res) => {
  const { name, destination, start_date, end_date, cover_image, budget, spent, travelers, status, description, privacy } = req.body;
  db.query(
    "UPDATE trips SET name=?, destination=?, start_date=?, end_date=?, cover_image=?, budget=?, spent=?, travelers=?, status=?, description=?, privacy=? WHERE id=?",
    [name, destination, start_date, end_date, cover_image, budget, spent, travelers, status, description, privacy, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// DELETE trip
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM trips WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

module.exports = router;
