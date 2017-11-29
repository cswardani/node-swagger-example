var fs = require("fs");
module.exports = {
    getApi : function(){
     var data = fs.readFileSync(__dirname+'/../api/api.txt');
     return data.toString();
    }
};
