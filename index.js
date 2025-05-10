// express va boshqa paketlarni chaqirish
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL ulanish
const db = mysql.createConnection({
    host: 'sql8.freesqldatabase.com',
    user: 'sql8777665',
    password: '6FjIuz37c5',
    database: 'sql8777665',
    port: 3306
});

// Test endpoint
app.get('/', (req, res) => {
    res.send('Server ishlayapti brat !');
});


// =======================================
// O‘QUVCHI — POST /register
// =======================================
app.post('/register', (req, res) => {
    const { ism, yosh, guruh, oqituvchi_id } = req.body;
    const sql = "INSERT INTO oquvchi (ism, yosh, guruh, oqituvchi_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [ism, yosh, guruh, oqituvchi_id], (err, result) => {
        if (err) {
            console.error('O‘quvchi yozishda xatolik:', err);
            return res.status(500).json({ message: 'Bazaga yozishda xatolik' });
        }
        res.json({ message: 'O‘quvchi muvaffaqiyatli yozildi' });
    });
});


// =======================================
// ALOQA — GET /aloqa
// =======================================
app.get('/aloqa', (req, res) => {
    const sql = "SELECT * FROM aloqa ORDER BY yuborilgan_vaqt DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Xabarlarni olishda xatolik:', err);
            return res.status(500).json({ message: 'Bazadan ma\'lumot olishda xatolik' });
        }
        res.json(results);
    });
});


// =======================================
// ALOQA — POST /aloqa
// =======================================
app.post('/aloqa', (req, res) => {
    const { ism, email, xabar } = req.body;
    const sql = "INSERT INTO aloqa (ism, email, xabar, yuborilgan_vaqt) VALUES (?, ?, ?, NOW())";
    db.query(sql, [ism, email, xabar], (err, result) => {
        if (err) {
            console.error('Xabar yozishda xatolik:', err);
            return res.status(500).json({ message: 'Xabar bazaga yozilmadi' });
        }
        res.json({ message: 'Xabar muvaffaqiyatli yuborildi' });
    });
});


// =======================================
// SERVERNI ISHGA TUSHIRISH
// =======================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server ${PORT}-portda ishga tushdi`);
});
