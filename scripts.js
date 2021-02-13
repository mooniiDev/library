const myLibrary = [];

function Books(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Books(title, author, pages, status);
  myLibrary.push(book);
  return myLibrary;
}
addBookToLibrary('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '464', 'read');
addBookToLibrary('The Lady of the Lake', 'Andrzej Sapkowski', '544', 'unread');

function showLibraryInfo() {
  let readCounter = 0;
  let unreadCounter = 0;
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === 'read') {
      readCounter += 1;
      const booksRead = document.querySelector('#books-read');
      booksRead.textContent = readCounter;
    } else if (myLibrary[i].status === 'unread') {
      unreadCounter += 1;
      const booksUnread = document.querySelector('#books-unread');
      booksUnread.textContent = unreadCounter;
    }
  }
  const totalBooks = document.querySelector('#total-books');
  totalBooks.textContent = myLibrary.length;
}
showLibraryInfo();

function showBooksInLibrary() {
  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookList = document.querySelector('#table-body');
    const bookRow = document.createElement('tr');
    bookRow.classList.add('book-info');
    bookList.appendChild(bookRow);

    const bookTitle = document.createElement('td');
    bookTitle.textContent = myLibrary[i].title;
    bookRow.appendChild(bookTitle);

    const bookAuthor = document.createElement('td');
    bookAuthor.textContent = myLibrary[i].author;
    bookRow.appendChild(bookAuthor);

    const bookPages = document.createElement('td');
    bookPages.textContent = myLibrary[i].pages;
    bookRow.appendChild(bookPages);

    const bookStatus = document.createElement('td');
    const statusButton = document.createElement('button');
    const statusSymbol = document.createElement('i');
    if (myLibrary[i].status === 'read') {
      statusSymbol.classList.add('fas', 'fa-check');
    } else if (myLibrary[i].status === 'unread') {
      statusSymbol.classList.add('fas', 'fa-times');
    }
    statusButton.appendChild(statusSymbol);
    bookStatus.appendChild(statusButton);
    bookRow.appendChild(bookStatus);

    const bookDelete = document.createElement('td');
    const deleteButton = document.createElement('button');
    const deleteSymbol = document.createElement('i');
    deleteSymbol.classList.add('fas', 'fa-trash-alt');
    deleteButton.appendChild(deleteSymbol);
    bookDelete.appendChild(deleteButton);
    bookRow.appendChild(bookDelete);
  }
}
showBooksInLibrary();
