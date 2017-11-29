const fs = require("fs");
const encryptor = require('file-encryptor');
const key = 'My Super Secret Key';

module.exports = {
    ReadApiKey: function(callback){
        // fs.readFile(__dirname+'/api.txt', function (err, data){
        //     if(err) return console.log(err);
        //     return callback(data.toString());
        // });
        var data = fs.readFileSync(__dirname+'/api.txt');
        return callback(data.toString());
    },
    CreateToken : function(token){
        var writerStream = fs.createWriteStream(__dirname+'/token.txt');
        writerStream.write(token,'UTF8');
        writerStream.end();
        writerStream.on('finish', function() {
            console.log('write completed');
        });
        
        writerStream.on('error', function(err){
           console.log(err.stack);
        });
        encryptor.encryptFile(__dirname+'/token.txt', __dirname+'/token.dat', key, function(err) {
            fs.unlinkSync(__dirname+'/token.txt');
        });

        
    },
    ReadToken : function(callback){
        encryptor.decryptFile(__dirname+'/token.dat', __dirname+'/token.txt', key, function(err) {
            var data = fs.readFileSync(__dirname+'/token.txt');
            fs.unlinkSync(__dirname+'/token.dat');
            return callback(data.toString());
        });
        
    }
}