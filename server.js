// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/update-link', (req, res) => {
    const newLink = req.body.link;
    const key = req.body.key; // المفتاح الذي تريد تحديثه في admin.json

    fs.readFile('https://8mdhi.netlify.app/admin.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('حدث خطأ في قراءة الملف.');
        }

        let json = JSON.parse(data);
        if (json[key]) {
            json[key].link = newLink;
        }

        fs.writeFile('admin.json', JSON.stringify(json, null, 2), (err) => {
            if (err) {
                return res.status(500).send('حدث خطأ في كتابة الملف.');
            }
            res.send('تم تحديث الرابط بنجاح.');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
