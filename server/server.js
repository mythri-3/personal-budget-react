const express = require('express');
const cors = require('cors');
const fs = require("fs");
const app = express();
const port = 3000;

app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    fs.readFile("budget.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading data");
            return;
        }
        const budgetData = JSON.parse(data);
        res.json(budgetData);
    });
});

app.get("/chart", (req, res) => {
    fs.readFile("chart.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading data");
            return;
        }
        const chartData = JSON.parse(data);
        res.json(chartData);
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
