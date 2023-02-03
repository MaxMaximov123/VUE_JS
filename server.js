const fs = require('fs');
const https = require('https');
const express = require("express");
const { Client } = require('pg');
const { response } = require('express');
const port = 3002;
const app = express();
var router = express.Router();
const jsonParser = express.json();


// app.use(express.static(__dirname + "/dist"));
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Blanik 2007',
    port: 5433,
});

// client.connect();


app.get("/stock", jsonParser, async function get_stock(req, res) {
    url = "https://scanner.tradingview.com/america/scan"
    var data = JSON.parse(fs.readFileSync("data/option_to_get_stocks.json", 'utf8'))
    data.markets.push('america');
    data = JSON.stringify(data)
    fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: data
})
.then(response => response.json())
.then(response => {
    res.send(response)
})
});


app.get('/data', (request, response) => {
    const query = ` 
    SELECT id, login, password
	FROM public.users;
 `;
    var data = {};
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        data = res.rows;
        console.log(data);
        response.json(data);
    });
});



const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});