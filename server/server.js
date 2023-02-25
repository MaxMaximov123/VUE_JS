const fs = require('fs');
const https = require('https');
const express = require("express");
const { Pool } = require('pg');
const { response } = require('express');
const port = 3002;
const app = express();
var router = express.Router();
const jsonParser = express.json();
const { time } = require('console');

const WebSocket = require('ws');
const { type } = require('os');
const server_ws = new WebSocket.Server({ port: 8000, path: '/stocks'});
const countries = [
  'america', 'argentina', 'bahrain', 'belgium',
  'brazil', 'uk', 'hungary', 'venezuela',
  'vietnam', 'germany', 'hongkong', 'greece',
  'denmark', 'egypt', 'israel', 'india',
  'indonesia', 'iceland', 'spain', 'italy',
  'canada', 'qatar', 'china', 'colombia',
  'latvia', 'lithuania', 'luxembourg', 'malaysia',
  'mexico', 'nigeria', 'netherlands', 'newzealand',
  'norway', 'uae', 'peru', 'poland',
  'portugal', 'russia', 'romania', 'ksa',
  'serbia', 'singapore', 'slovakia', 'thailand',
  'taiwan', 'turkey', 'philippines', 'finland',
  'france', 'chile', 'switzerland', 'sweden',
  'estonia', 'rsa', 'korea', 'japan'];
var stocks = {};


/* .....................DB...................... */
class DB{
  conn = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // default port for PostgreSQL
  });

  create_table(){

  }
}


function choose(choices) {
  if (choices){
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }
}

server_ws.on('connection', (socket) => {
  console.log('A client connected!');

  socket.on('message', (message) => {
    let inp_data = JSON.parse(message);
    if (inp_data.type == 'stocks' & inp_data.country in stocks){
      socket.send(JSON.stringify(stocks[inp_data.country].data.slice(...inp_data.range)));
    }
  });

  socket.on('close', () => {
    console.log('A client disconnected!');
  });
});

class Stocks{
  
  get_stocks() {
    for (let coutry of countries){
      let url = `https://scanner.tradingview.com/${coutry}/scan`
      var data = JSON.parse(fs.readFileSync("data/option_to_get_stocks.json", 'utf8'));
      data.range = [0, 999999]
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
        if (response) {stocks[coutry] = response;} else {console.warn('no data')}
      })
      .catch((e) => console.warn(`some error ${e}`));
    }
  console.log('download comlete')
  }
}

const st = new Stocks()
st.get_stocks();
setInterval(st.get_stocks, 5000)


app.get("/api/stock/", jsonParser, function send_st(req, res){res.send(st.stocks)});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});