const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

// CHANGE THIS PASSWORD TO YOUR OWN!
const ADMIN_PASSWORD = 'StarterPool2024';

// Admin login page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// Check password
app.post('/admin/check', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Protected admin dashboard
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Student signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Student profile page
app.get('/student/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

// TEST profile page
app.get('/test/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-profile.html'));
});

// API endpoints
app.get('/api/hires', (req, res) => {
    const hiresFile = path.join(__dirname, 'hires.json');
    if (fs.existsSync(hiresFile)) {
        const hires = JSON.parse(fs.readFileSync(hiresFile, 'utf8'));
        res.json(hires);
    } else {
        res.json([]);
    }
});

app.post('/api/hires', (req, res) => {
    const hiresFile = path.join(__dirname, 'hires.json');
    fs.writeFileSync(hiresFile, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

app.get('/api/students', (req, res) => {
    const studentsFile = path.join(__dirname, 'students.json');
    if (fs.existsSync(studentsFile)) {
        const students = JSON.parse(fs.readFileSync(studentsFile, 'utf8'));
        res.json(students);
    } else {
        res.json({});
    }
});

app.post('/api/students', (req, res) => {
    const studentsFile = path.join(__dirname, 'students.json');
    fs.writeFileSync(studentsFile, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

// Get pending student applications
app.get('/api/pending-students', (req, res) => {
    const pendingFile = path.join(__dirname, 'pending_students.json');
    if (fs.existsSync(pendingFile)) {
        const pending = JSON.parse(fs.readFileSync(pendingFile, 'utf8'));
        res.json(pending);
    } else {
        res.json([]);
    }
});

app.post('/api/pending-students', (req, res) => {
    const pendingFile = path.join(__dirname, 'pending_students.json');
    fs.writeFileSync(pendingFile, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔒 Admin login: http://localhost:${PORT}/admin`);
    console.log(`📝 Student signup: http://localhost:${PORT}/signup`);
    console.log(`🧪 Test page: http://localhost:${PORT}/test/maria`);
    console.log(`🔑 Admin Password: ${ADMIN_PASSWORD}`);
});