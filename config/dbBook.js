'use strict;'
//Include crypto to generate the book id
var crypto = require('crypto');

var fs = require('fs');

module.exports = function(req, res) {
    return {
        bookList : [],
        /*
         * Save the book inside the "db".
         */
        save(book) {
            var books = {
                id: crypto.randomBytes(20).toString('hex'),
                title: book.title,
                year: book.year
            };
            console.log(book);
            //book.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.bookList.push(books);
            return 1;           
        },
        /*
         * Retrieve a book with a given id or return all the books if the id is undefined.
         */
        find(id) {
            if(id) {
                return this.bookList.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.bookList;
            }
        },
        /*
         * Delete a book with the given id.
         */
        remove(id) {
            var found = 0;
            this.bookList = this.bookList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;           
        },
        /*
         * Update a book with the given id
         */
        update(id, book) {
            var bookIndex = this.bookList.findIndex(element => {
                return element.id === id;
            });
            if(bookIndex !== -1) {
                this.bookList[bookIndex].title = book.title;
                this.bookList[bookIndex].year = book.year;
                return 1;
            }else {
                return 0;
            }
        }       
    }
};  