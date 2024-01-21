// Create web server    
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

// Set up MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');

// Create schema for comments
var commentSchema = mongoose.Schema({
    name: String,
    comment: String
});

// Create model for comments
var Comment = mongoose.model('Comment', commentSchema);

// Set up server to serve static files
app.use(express.static(__dirname + '/public'));

// Set up socket.io to listen to port 3000
io.on('connection', function(socket) {
    console.log('A user has connected');
    socket.on('disconnect', function() {
        console.log('A user has disconnected');
    });
});