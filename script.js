const closeModalBtn=document.querySelector('.close-modal');
const addBookBtn=document.querySelector('#add-book-btn');
const backgroundModal=document.querySelector('.background-modal');

const closeModal=()=>{
    backgroundModal.setAttribute('id','inactive');
}
const openModal=()=>{
    backgroundModal.setAttribute('id','active');
}
window.addEventListener('click',(e)=>{
    if(e.target.getAttribute('class')==='background-modal'){
        closeModal();
    }
})
closeModalBtn.addEventListener('click',()=>{
    closeModal();
})
addBookBtn.addEventListener('click',()=>{
    openModal();
})


















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
// addNewBook takes the input of books from the user, number of pages is set to 0 by defaullt and also isRead boolean is set to false.
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
// function that takes an id as a paramater and then finds the book by id , each book has a function that was inseted in protoype which changes the boolean of value of read to true.
const markAsRead=(id)=>{
    try{
        const book=findBook(id);
        book.markAsRead();
    }
    catch(e){
        return e;
    }
}
const markAsUnread=(id)=>{
    try{
        const book=findBook(id);
        book.markAsUnread();
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
