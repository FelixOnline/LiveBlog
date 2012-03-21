/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socket = require('socket.io')
  , request = require('request')
  , config = require('./config') // config file

//var url = 'http://felixonline.co.uk/varsity/blogdata.php';
var url = 'http://felixonline.local/varsity/blogdata.php';
var cache;

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
//app.get('/', routes.index);

app.get('/newpost', function(req, res) {
    if(config.api == req.param('api')) {
        console.log('Correct api');
        getData(url, function(data) {
            cache = data;
            io.sockets.emit('newpost', { data: cache });
        });
        res.send('thanks!');
    } else {
        res.send('wrong api');
    }
});

app.get('/matchupdate', function(req, res) {
    console.log('match update');
    if(config.api == req.param('api')) {
        console.log('Correct api');
        getData(url, function(data) {
            cache = data;
            io.sockets.emit('matchupdate', { data: cache });
        });
        res.send('thanks!');
    } else {
        res.send('wrong api');
    }
});

var io = socket.listen(app);
io.set('log level', 1); // reduce logging

io.sockets.on('connection', function(socket) {
    if(cache) {
        console.log('cache');
        socket.emit('datastart', { data: cache });
    } else {
        console.log('not cache');
        getData(url, function(json) {
            cache = json;
            socket.emit('datastart', { data: cache });
        });
    }
});

function getData(url, callback) {
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var json = JSON.parse(body);
            } catch(e) {
                console.log(e);
            }
            if(typeof(callback) == 'function') callback(json);
        }
    });
}

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
