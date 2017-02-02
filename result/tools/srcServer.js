import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import async  from 'async';
import pg  from 'pg';
import cookieParser  from 'cookie-parser';
import bodyParser  from 'body-parser';
import methodOverride  from 'method-override';
import http  from 'http';
import socketIo from 'socket.io';
import path from 'path';

/* eslint-disable no-console */

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = process.env.PORT || 4000;

io.set('transports', ['polling']);
io.sockets.on('connection', function (socket) {

  socket.emit('message', { text : 'Welcome!' });
  socket.on('subscribe', function (data) {
    socket.join(data.channel);
  });
});

async.retry(
  {times: 1000, interval: 1000},
  function(callback) {
    pg.connect('postgres://postgres@db/postgres', function(err, client, done) { //change @db to your exposed container if running on dev PC
      if (err) {
        console.error("Waiting for db - " + err);
      }
      callback(err, client);
    });
  },
  function(err, client) {
    if (err) {
      return console.err("Giving up");
    }
    console.log("Connected to db");
    getVotes(client);
  }
);

function getVotes(client) {
  client.query('SELECT vote, COUNT(id) AS count FROM votes GROUP BY vote', [], function(err, result) {
    if (err) {
      console.error("Error performing query: " + err);
    } else {
      const votes = collectVotesFromResult(result);
      io.sockets.emit("scores", JSON.stringify(votes));
    }

    setTimeout(function() {getVotes(client); }, 1000);
  });
}

function collectVotesFromResult(result) {
  let votes = {a: 0, b: 0};

  result.rows.forEach(function (row) {
    votes[row.vote] = parseInt(row.count);
  });

  return votes;
}

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(express.static(__dirname + './../src'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + './../src/index.html'));
});

server.listen(port, function () {
  const port = server.address().port;
  console.log('App running on port ' + port);
});
