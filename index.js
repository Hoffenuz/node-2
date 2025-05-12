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

// =================== TEST =====================
app.get('/', (req, res) => {
    res.send('Server ishlayapti!');
});

// =============== ALOQA: POST /aloqa ================
app.post('/aloqa', (req, res) => {
    const { ism, email, xabar } = req.body;
    const sql = "INSERT INTO aloqa (ism, email, xabar, yuborilgan_vaqt) VALUES (?, ?, ?, NOW())";
    db.query(sql, [ism, email, xabar], (err, result) => {
        if (err) {
            console.error('❌ Xabar yozishda xatolik:', err);
            return res.status(500).json({ message: 'Xabar bazaga yozilmadi' });
        }
       res.status(200).json({ success: true, message: 'Xabar muvaffaqiyatli yuborildi' });

    });
});

// =============== ALOQA: GET /aloqa ================
app.get('/aloqa', (req, res) => {
    const sql = "SELECT * FROM aloqa ORDER BY yuborilgan_vaqt DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Xabarlarni olishda xatolik:', err);
            return res.status(500).json({ message: 'Ma\'lumot olishda xatolik' });
        }
        res.json(results);
    });
});

// =========== O‘QITUVCHI: GET /oqituvchilar ============
app.get('/oqituvchi', (req, res) => {
    const sql = "SELECT * FROM oqituvchi";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ O‘qituvchilarni olishda xatolik:', err);
            return res.status(500).json({ message: 'O‘qituvchilarni olishda xatolik' });
        }
        res.json(results);
    });
});

// =========== AVTOMOBIL: GET /avtomobillar ============
app.get('/avtomobil', (req, res) => {
    const sql = "SELECT * FROM avtomobil";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Avtomobillarni olishda xatolik:', err);
            return res.status(500).json({ message: 'Avtomobillarni olishda xatolik' });
        }
        res.json(results);
    });
});

// =========== SERVERNI ISHGA TUSHURISH ============
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT}-portda ishga tushdi`);
});
