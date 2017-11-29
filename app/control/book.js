'use strict';
// Include our "db"
var db = require('../../config/dbBook')();
// Exports all the functions to perform on the db
module.exports = {getAll, save, getOne, update, delMovie};
var book = {
    title: "",
    year: 0
}

//GET /book operationId
function getAll(req, res, next) {
  res.json({ book: db.find()});
}
//POST /book operationId
function save(req, res, next) {
    //console.log(req.body);
    res.json({success: db.save(req.body), description: "Book added to the list!"});
}
//GET /book/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var book = db.find(id);
    if(book) {
        res.json(book);
    }else {
        res.status(204).send();
    }       
}
//PUT /book/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var book = req.body;
    if(db.update(id, book)){
        res.json({success: 1, description: "Movie updated!"});
    }else{
        res.status(204).send();
    }

}
//DELETE /book/{id} operationId
function delMovie(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    if(db.remove(id)){
        res.json({success: 1, description: "Movie deleted!"});
    }else{
        res.status(204).send();
    }

}