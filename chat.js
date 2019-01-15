var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chatSchema = new Schema({
    name: String,
    message: String,
    t : String 
    
    
    
});

var chat = mongoose.model('chat', chatSchema);

module.exports = chat;