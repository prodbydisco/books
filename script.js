const myLibrary = [];
const tableBody = document.getElementById('books-table-body');
const submitForm = document.getElementById('submit-form');
const addButton = document.getElementById('add-book');

function Book(title, author, pages, read) {
	
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
	
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	
	this.info = function() {
		return `Book ID: ${this.id}, ${this.title}, ${this.author}, ${this.pages} pages, ${this.read ? "has been read." : 
		"has not been read yet."}`;
	}
}


function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));

    renderTable();
}

function logBooks() {
    myLibrary.forEach(book => {
        console.log(book.info());
    })
}

function renderTable() {
    
    tableBody.innerHTML = '';
    
    myLibrary.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function submitBook() {
    const name = document.getElementById('name').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = Number(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    // validation checks
    if (name === '') {
        alert("Please enter a book name.");
        return;
    }
    if (!author) {
        alert("Please enter an author.");
        return;
    }
    if (!pages || pages < 1 || pages > 5000) {
        alert("Please enter a valid number of pages (1-5000).");
        return;
    }
    
    myLibrary.push(new Book(name, author, pages, read));
    renderTable();
}


// show input-container when "add-book" is clicked
addButton.addEventListener('click', function (e) {
    e.stopPropagation();

    document.querySelector('.input-container').style.display = 'flex';
    document.querySelector('body').style.cursor = 'pointer';
});

// hide input-container when clicking outside of the form and input-container
document.addEventListener('click', function (e) {
    const inputContainer = document.querySelector('.input-container');
    const form = document.getElementById('submit-form');
    if (
        inputContainer.style.display === 'flex' &&
        !inputContainer.contains(e.target) &&
        !e.target.matches('#add-book')
    ) {
        inputContainer.style.display = 'none';
        document.querySelector('body').style.cursor = 'default';
    }
});

// hide input-container by default on page load
document.querySelector('.input-container').style.display = 'none';

addBookToLibrary('Harry Potter', 'J.K. Rowling', 365, true);
addBookToLibrary('The Hunger Games', 'Suzanne Collins', 420, false);
logBooks();