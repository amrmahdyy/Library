const closeModalBtn=document.querySelector('.close-modal');
const addBookBtn=document.querySelector('#add-book-btn');
const addBookModalBtn=document.querySelector('#add-book');
const backgroundModal=document.querySelector('.background-modal');
const bookName=document.querySelector('#book');
const form=document.forms.bookForm;
const tableContent=document.querySelector('#table-content');
// const deleteBook=document.querySelector('')

const insertNewBookInTable=(bookInfo={})=>{
    const newRow=document.createElement('tr');
    newRow.setAttribute('data-id',bookInfo.id);
newRow.setAttribute('class','row');
const book=document.createElement('td');
const author=document.createElement('td');
const pages=document.createElement('td');
const read=document.createElement('td');
const deleteBtn=document.createElement('td');

const deleteIcon=document.createElement('a');
deleteIcon.classList.add('delete-book');
deleteIcon.innerHTML=`<i style="color:#C3423F;" class="far fa-trash-alt fa-lg delete-book"></i>`;
deleteBtn.appendChild(deleteIcon);

book.textContent=bookInfo.book;
author.textContent=bookInfo.author;
pages.textContent=bookInfo.pages;
read.textContent=bookInfo.read?'Yes':'No';

newRow.appendChild(book);
newRow.appendChild(author);
newRow.appendChild(pages);
newRow.appendChild(read);
newRow.appendChild(deleteBtn);

tableContent.appendChild(newRow);
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(form);
    console.log(bookName.value)
    const formData=new FormData(form);
    const inputNames=['bookName','author','pages','read'];
    let inputData={};
    inputNames.forEach((elem)=>{
        inputData[elem]=formData.get(elem);
    });
    inputData.read=inputData.read==='true'?true:false;
    for(let key in inputData)inputData[key]=(inputData[key]===''?'NA':inputData[key]);
    console.log(inputData);
    addNewBook(inputData.author,inputData.bookName,inputData.pages,inputData.read);
    clearInputs();
    closeModal();
});


// clear inputs after saving the book
const clearInputs=()=>{
    const inputs=document.querySelectorAll('form input');
    inputs.forEach((input)=>{
        let type=input.getAttribute('type');
        if(type!=='checkbox' && type!=='submit')
            input.value='';
    })
}

const closeModal=()=>{
    backgroundModal.setAttribute('id','inactive');
    // const inactive=document.querySelector('#inactve');
    backgroundModal.style.transition='opacity 250ms ease-in-out, visibility 250ms ease-in-out';
}
const openModal=()=>{
    backgroundModal.setAttribute('id','active');
}

window.addEventListener('click',(e)=>{
    if(e.target.getAttribute('class')==='background-modal'){
        closeModal();
    }
    if(e.target.classList.contains('delete-book')){
        const bookRow=e.target.parentElement.parentElement.parentElement;
        console.log(bookRow);
        const bookId=bookRow.getAttribute('data-id');
        console.log(bookId);
        deleteBook(bookRow,bookId);
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
// const getBooksSize=()=>books.length;
let idCounter=0;


function Book(author,book,pages,read){
    this.author=author;
    this.book=book;
    this.pages=pages;
    this.read=read;
}
Book.prototype.markAsRead=function(){
    this.read=true;
}
Book.prototype.markAsUnread=function(){
    this.read=false;
}

const deleteRow=(rowNode)=>{
    rowNode.remove();
}
// updatTable function used to update the books after deleting a book so it can be removed from the table
// const updateTable=(booksAr=[])=>{
//     clearTable();
//     booksArr.forEach((book)=>{
//         insertNewBookInTable(book);
//     })
// }
// addNewBook takes the input of books from the user, number of pages is set to 0 by defaullt and also read boolean is set to false.
const addNewBook=(author,book,pages=0,read=false)=>{
    const newBook=new Book(author,book,pages,read);
    const id=++idCounter;
    newBook.id=id;
    books.push(newBook);
    insertNewBookInTable(newBook);
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
const deleteBook=(rowNode,id)=>{
    try{
        const book=findBook(id);
        console.log(book);
        const bookIndex=books.indexOf(book); 
        console.log(books); 
        books.splice(bookIndex,1);
        console.log(books);
        deleteRow(rowNode);
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


 
// let newBook_s={book:'Lolo',author:'amr',pages:200,read:true};
// insertNewBookInTable(newBook_s);
// (addNewBook('amr','underwater',280,false));
// (addNewBook('amr','underwater',280,false));
// (addNewBook('amr','underwater',280,false));
// (addNewBook('amr','underwater',280,false));
// deleteBook(1);
// console.log(deleteBook(1))
markAsRead(1);
console.log(books);

// console.log(findBook(0))
