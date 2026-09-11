const expressApp = require('express');
const cors = require('cors');
const path = require('path');
const app = expressApp();
const PORT = 3000;

app.use(cors());
app.use(expressApp.json());

// index.html ve statik dosyaları sunmak için
app.use(expressApp.static(__dirname));

// Sağlayıcı ve platform taban oranları
app.get('/api/info', (req, res) => {
    res.json({
        isp: "Kablonet / Superonline Fiber",
        baseAverages: {
            general: 85.0,
            steam: 78.4,
            psn: 64.2,
            xbox: 71.5
        }
    });
});

// Genel test dosyası (10 MB)
app.get('/api/test/download', (req, res) => {
    const fileSizeBytes = 10 * 1024 * 1024; 
    const buffer = Buffer.alloc(fileSizeBytes, 'x');
    
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileSizeBytes);
    res.send(buffer);
});

// Steam, PSN ve Xbox için özel test rotaları
app.get('/api/test/steam', (req, res) => {
    const fileSizeBytes = 5 * 1024 * 1024; // 5 MB
    const buffer = Buffer.alloc(fileSizeBytes, 's');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileSizeBytes);
    res.send(buffer);
});

app.get('/api/test/psn', (req, res) => {
    const fileSizeBytes = 5 * 1024 * 1024; // 5 MB
    const buffer = Buffer.alloc(fileSizeBytes, 'p');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileSizeBytes);
    res.send(buffer);
});

app.get('/api/test/xbox', (req, res) => {
    const fileSizeBytes = 5 * 1024 * 1024; // 5 MB
    const buffer = Buffer.alloc(fileSizeBytes, 'x');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileSizeBytes);
    res.send(buffer);
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});