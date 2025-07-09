const myLibrary = [];
const cardContainer = document.querySelector('.card-container');
const submitForm = document.getElementById('submit-form');
const addButton = document.getElementById('add-button');
const body = document.querySelector('body');
const inputContainer = document.querySelector('.input-container');

function Book(title, author, description, publishDate, pages, read) {
	
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
	
	this.title = title;
	this.author = author;
    this.description = description;
	this.pages = pages;
    this.publishDate = publishDate;
	this.read = read;
	
	this.info = function() {
		return `Book ID: ${this.id}, ${this.title}, ${this.author}, ${this.pages} pages, ${this.read ? "has been read." : 
		"has not been read yet."}`;
	}
}


function addBookToLibrary(title, author, description, publishDate, pages, read) {
    myLibrary.push(new Book(title, author, description, publishDate, pages, read));

    addCards();
}

function logBooks() {
    myLibrary.forEach(book => {
        console.log(book.info());
    })
}

function addCards() {
    cardContainer.innerHTML = ''; // clear previous cards

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute("id", book.id);

        // set display for icons based on book.read
        const eyeMinusDisplay = book.read ? 'inline' : 'none';
        const eyePlusDisplay = book.read ? 'none' : 'inline';

        card.innerHTML = `
            <div class="card-pair">
                <h3 class="title">${book.title} - ${book.author}</h3>
                <p class="description">${book.description}</p>
            </div>
            <div class="bottom-pair">
                <p class="date">Published ${book.publishDate}</p>
                <div class="card-icons">
                    <img src="img/eye-minus.svg" class="read-icon eye-minus" style="display:${eyeMinusDisplay}; cursor:pointer;">
                    <img src="img/eye-plus.svg" class="read-icon eye-plus" style="display:${eyePlusDisplay}; cursor:pointer;">
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        `;

        // toggle read status when eye icon is clicked
        const eyeMinus = card.querySelector('.eye-minus');
        const eyePlus = card.querySelector('.eye-plus');

        eyeMinus.addEventListener('click', function() {
            book.read = false;
            addCards();
        });

        eyePlus.addEventListener('click', function() {
            book.read = true;
            addCards();
        });

        // delete card using button
        card.querySelector('.delete-button').addEventListener('click', function(e) {
            const cardID = e.target.closest('.card').id;
            const index = myLibrary.findIndex(book => book.id === cardID);

            if (index !== -1) {
                myLibrary.splice(index, 1);
                addCards();
            }
        });

        cardContainer.appendChild(card);
    });
}

function submitBook() {
    const name = document.getElementById('name').value.trim();
    const author = document.getElementById('author').value.trim();
    const description = document.getElementById('description').value.trim();
    const publishDate = Number(document.getElementById('publish-date').value);
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
    
    myLibrary.push(new Book(name, author, description, publishDate, pages, read));
    addCards();
}


// show input-container when "add-book" is clicked
addButton.addEventListener('click', function (e) {
    e.stopPropagation();

    inputContainer.style.display = 'flex';
    body.style.cursor = 'pointer';
    cardContainer.style.filter = 'blur(6px)';
});

// hide input-container when clicking outside of the form and input-container
document.addEventListener('click', function (e) {
    const inputContainer = document.querySelector('.input-container');

    if (
        inputContainer.style.display === 'flex' &&
        !inputContainer.contains(e.target) &&
        !e.target.matches('#add-book')
    ) {
        inputContainer.style.display = 'none';
        cardContainer.style.filter = 'blur(0px)';
        body.style.cursor = 'default';
    }
});

// hide input-container by default on page load
inputContainer.style.display = 'none';

addBookToLibrary('Man and His Symbols', 'Carl G. Jung', "Man and His Symbols is a guide to understanding our dreams and interrogating the many facets of identity-our egos and our shadows, 'the dark side of our natures.'", 1964, 500, false);
addBookToLibrary('Harry Potter', 'J.K. Rowling', "Harry Potter is a young wizard, the protagonist of J.K. Rowling's popular book series. He is described as having a thin face, knobbly knees, black, untidy hair, bright green eyes, and a lightning bolt-shaped scar on his forehead.", 1990, 365, true);
addBookToLibrary('The Hunger Games', 'Suzanne Collins', "The Capitol, forces each of its twelve districts to send two tributes (a boy and a girl) to participate in a televised fight to the death, known as the Hunger Games.", 2001, 420, false);
logBooks();