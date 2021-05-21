// const body=document.querySelector('body');
// const greeting=document.createElement('p');
// greeting.textContent="Hey I'm red";
// const blueHead=document.createElement('h3');
// blueHead.textContent='I’m a blue h3!';
// const container=document.createElement('div');
// container.style="border:1px solid black;background-color:yellow;";
// const containerHeader=document.createElement('h1');
// containerHeader.textContent='I am in a div';
// const reply=document.createElement('p');
// reply.textContent='Me too!';
// body.appendChild(greeting);
// body.appendChild(blueHead);
// body.appendChild(container);
// container.appendChild(containerHeader);
// container.appendChild(reply);

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
    newBook.markAsRead();
    newBook.markAsUnread();
    books.push(newBook);
}
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

 

(addNewBook('amr','underwater',280,false));
(addNewBook('amr','underwater',280,false));
(addNewBook('amr','underwater',280,false));
(addNewBook('amr','underwater',280,false));
deleteBook(1);
console.log(deleteBook(1))
console.log(books);

// console.log(findBook(0))
