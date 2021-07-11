// Book Class: Represents a book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author= author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI{
    static displayBooks(){

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm d-inline delete">Remove</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}

// Store Class: Handles Storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books=[];
        }
        else{ 
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(books.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) =>{
    //Prevent actual submit
    e.preventDefault();
    
    //Get Form Values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Validate
    if(title ==='' || author==='' || isbn===''){
        document.querySelector('#msg').style.display= 'block';
        document.querySelector('#msg').innerHTML="Please fill all the fields!";
        setTimeout(() => (document.querySelector('#msg').innerText = "",document.querySelector('#msg').style.display= 'none'), 3000);
        
    }
    else{
    //Instatiate book
    const book = new Book(title,author,isbn);
    
    //Add Book to UI
    UI.addBookToList(book);

    //Add Book to local storage
    Store.addBook(book);


    //Show Success msg
    document.querySelector('#msg2').style.display= 'block';
    document.querySelector('#msg2').innerHTML="Book Added!";
    setTimeout(() => (document.querySelector('#msg2').innerText = "",document.querySelector('#msg2').style.display= 'none'), 3000);

    //Clear Fields
    UI.clearFields();
    }
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) =>{
    // Remove the Book from UI
    UI.deleteBook(e.target);
    
    // Remove the Book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textcontent);


    //delet msg
    document.querySelector('#msg3').style.display= 'block';
    document.querySelector('#msg3').innerHTML="Book Deleted!";
    setTimeout(() => (document.querySelector('#msg3').innerText = "",document.querySelector('#msg3').style.display= 'none'), 3000);
});
 