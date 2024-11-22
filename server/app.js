const express = require('express');
const cors = require('cors'); // Mengimpor CORS
const { Client } = require('pg');
const app = express();
const port = 4000; // Port yang baru

// Gunakan middleware CORS untuk mengizinkan akses dari frontend
app.use(cors({
    origin: 'http://localhost:5173',  // Mengizinkan frontend React yang berjalan di localhost:5173
    methods: ['GET', 'POST'], // Tentukan metode HTTP yang diizinkan
}));

// Parsing JSON untuk permintaan frontend
app.use(express.json());

// Mengonfigurasi koneksi database PostgreSQL
const client = new Client({
    user: 'telemedicine_user',  // Ganti dengan username PostgreSQL Anda
    host: 'localhost',          // Host database (localhost jika lokal)
    database: 'telemedicine', // Nama database yang telah dibuat
    password: '123456',    // Ganti dengan password user PostgreSQL
    port: 5432,                  // Port default PostgreSQL
});

// Mencoba menghubungkan ke database
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        // Setelah koneksi berhasil, baru jalankan server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Connection error', err.stack);
        // Jika koneksi gagal, berhenti menjalankan server
        process.exit(1); // Keluar dengan kode error
    });

// Endpoint untuk mengirim pesan bahwa server backend berjalan
app.get("/", (req, res) => {
    res.send({ message: "Backend is running!" });
});

// Menutup koneksi ke database saat server berhenti
process.on('SIGINT', () => {
    client.end()
        .then(() => {
            console.log('Disconnected from PostgreSQL');
            process.exit(0); // Keluar dengan kode sukses
        })
        .catch(err => {
            console.error('Error during disconnection', err.stack);
            process.exit(1);
        });
});
