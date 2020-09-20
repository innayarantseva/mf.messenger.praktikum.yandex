const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'));
// app.use(express.static('node_modules'));

app.listen(port, () => {
    console.log(`Messenger app listening at http://localhost:${port}`);
});
