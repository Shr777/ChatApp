var PORT = process.env.PORT || 3000;
var express=require('express');
var app=express();
var moment=require('moment');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose=require('mongoose');
var chat=require('./chat');

//connect to database
mongoose.connect('mongodb://localhost/chats', {
    useNewUrlParser: true
});
app.use(express.static('website'));
//connect to socket
io.on('connection',function(socket){
    chatStatus=function(s){
        socket.emit('status',s);
    }
    
    chat.find({},function(err,res){
        if(err){
            throw err;
        }
        socket.emit('output',res);

});

//input
socket.on('input',function(data){
   let  name=data.name;
    let message=data.message ;
    //var timestamps=moment().valueOf();
    var t=moment().format('LLL');
    console.log(t);
let newChat=new chat({
         name:name,
        message:message,
        t:t
        

    })

    newChat.save(function(err){
        if(!err)
        console.log('chat saved succesfully');
        socket.emit('output', [data]);

        // Send status object
        chatStatus({
            message: 'Message sent'
            
        });

    })

    
})

});


http.listen(PORT, function () {
	console.log('Server started successfully!');
});
