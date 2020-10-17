const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;

app.use(express.static('dist'));
app.use('/', router);

// почему-то с нуля не может подгрузиться settings/change
app.get(['/profile', '/profile/*'], (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
});
app.get(['/edit-profile', '/edit-profile/*'], (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
});
app.get(['/chats', '/chats/*'], (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
});
app.get('/sign-up', (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
});
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
});

app.listen(port, () => {
    console.log(`Messenger app listening at http://localhost:${port}`);
});
