

let books=[];

// helper function that return the books array size which will be used as a unique id
const getBooksSize=()=>books.length;


function Book(author,title,nPages,isRead){
    this.author=author;
    this.title=title;
    this.nPages=nPages;
    this.isRead=isRead;
}
Book.prototype.markAsRead=function(){
    this.isRead=true;
}
Book.prototype.markAsUnread=function(){
    this.isRead=false;
}
const addNewBook=(author,title,nPages=0,isRead=false)=>{
    const newBook=new Book(author,title,nPages,isRead);
    const id=getBooksSize()+1;
    newBook.id=id;
    books.push(newBook);
}
// findBook takes id as a parameter and loops over it, if it didn't find the book by id it will through en ERROR else return the foundBook.
const findBook=(id)=>{
    let bookObj={};
    books.forEach((book)=>{
       if(book.id==id)bookObj=book;
    });
    if(Object.keys(bookObj).length===0)throw new Error('Book unfound')
    return bookObj;
}
// deleteBook function has id parameter then it searchs for a book with this id if found it will search also for the index then splice it which will remove it from books array in place.
const deleteBook=(id)=>{
    try{
        const book=findBook(id);
        const bookIndex=books.indexOf(book);  
        books.splice(bookIndex,1);
    }
    catch(e){
        return e;
    }
}
const markAsRead=(id)=>{
    try{
        const book=findBook(id);
        book.markAsRead();
    }
    catch(e){
        return e;
    }
}


 

(addNewBook('amr','underwater',280,false));
(addNewBook('amr','underwater',280,false));
(addNewBook('amr','underwater',280,false));
(addNewBook('amr','underwater',280,false));
// deleteBook(1);
// console.log(deleteBook(1))
markAsRead(1);
console.log(books);

// console.log(findBook(0))
