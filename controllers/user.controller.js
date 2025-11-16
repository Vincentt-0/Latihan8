const User = require('../models/user.model'); //memanggil model

// GET semua user
exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => { //ambil dari models
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET user by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json(results);
    });
};

// POST user baru
exports.createUser = (req, res) => {
    const data = req.body;
    User.create(data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, ...data });
    });
};

// PUT update user
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    User.update(id, data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json({ message: 'User berhasil diupdate' });
    });
};

// DELETE user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json({ message: 'User berhasil dihapus'});
    });
};