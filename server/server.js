const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();
const port = 3000;

app.use(express.static('dist'));
app.use('/', router);

// почему-то с нуля не может подгрузиться settings/change
app.get(['/settings', '/settings/*'], (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
})
app.get(['/chats', '/chats/*'], (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
})
app.get('/sign-up', (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
})
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
})

app.listen(port, () => {
    console.log(`Messenger app listening at http://localhost:${port}`);
});
