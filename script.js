const myLibrary = [];

function Book(title, author, pages, read) {
	
	if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
	
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	
	this.info = function() {
		return `${title}, ${pages} pages, ${read ? "has been read" : 
		"has not been read yet"}`;
	}
}