const express = require('express');
const app = express();

const data = [
    { isDone: 0, text: 'Pet a dog', date: Date.now(), id: '353564356gre4356' },
    { isDone: 0, text: 'Eat some cheese', date: Date.now() + 1000, id: '3533467erf3464356' },
    { isDone: 1, text: 'Tell my grandma that she\'s old', date: Date.now() - 122000, id: '353346fee64356' }
];

app.get('/todo', (req, res) => {
    setTimeout(() => {
        const resData = JSON.stringify(data);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Content-Type', 'text/json');
        res.send(resData);
    }, 2000);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
