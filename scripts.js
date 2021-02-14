let myLibrary = [];

function Books(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function showBooksInLibrary() {
  const bookList = document.querySelector('#table-body');
  bookList.textContent = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookRow = document.createElement('tr');
    bookRow.classList.add('book-info');
    bookList.appendChild(bookRow);

    const bookTitle = document.createElement('td');
    bookTitle.textContent = myLibrary[i].title;
    bookTitle.classList.add('book-title');
    bookRow.appendChild(bookTitle);

    const bookAuthor = document.createElement('td');
    bookAuthor.textContent = myLibrary[i].author;
    bookAuthor.classList.add('book-author');
    bookRow.appendChild(bookAuthor);

    const bookPages = document.createElement('td');
    bookPages.textContent = myLibrary[i].pages;
    bookPages.classList.add('book-pages');
    bookRow.appendChild(bookPages);

    const bookStatus = document.createElement('td');
    const statusButton = document.createElement('button');
    const statusSymbol = document.createElement('i');
    if (myLibrary[i].status === 'read') {
      statusSymbol.classList.add('fas', 'fa-check');
    } else if (myLibrary[i].status === 'unread') {
      statusSymbol.classList.add('fas', 'fa-times');
    }
    bookStatus.classList.add('book-status');
    statusButton.appendChild(statusSymbol);
    bookStatus.appendChild(statusButton);
    bookRow.appendChild(bookStatus);

    const bookDelete = document.createElement('td');
    const deleteButton = document.createElement('button');
    const deleteSymbol = document.createElement('i');
    deleteSymbol.classList.add('fas', 'fa-trash-alt');
    deleteButton.appendChild(deleteSymbol);
    bookDelete.classList.add('book-delete');
    bookDelete.appendChild(deleteButton);
    bookRow.appendChild(bookDelete);
  }
}

function showLibraryInfo() {
  const booksRead = document.querySelector('#books-read');
  const booksUnread = document.querySelector('#books-unread');
  const totalBooks = document.querySelector('#total-books');
  let readCounter = 0;
  let unreadCounter = 0;
  if (myLibrary.length === 0) {
    booksRead.textContent = '0';
    booksUnread.textContent = '0';
  } else {
    for (let i = 0; i < myLibrary.length; i += 1) {
      if (myLibrary[i].status === 'read') {
        readCounter += 1;
        booksRead.textContent = readCounter;
      } else if (myLibrary[i].status === 'unread') {
        unreadCounter += 1;
        booksUnread.textContent = unreadCounter;
      }
    }
  }
  totalBooks.textContent = myLibrary.length;
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Books(title, author, pages, status);
  myLibrary.push(book);
  showLibraryInfo();
  showBooksInLibrary();
}

function deleteAllBooks() {
  const deleteAllBtn = document.querySelector('#delete-all-btn');
  deleteAllBtn.addEventListener('click', () => {
    myLibrary = [];
    showBooksInLibrary();
    showLibraryInfo();
  });
}

addBookToLibrary('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '464', 'read');
addBookToLibrary('The Lady of the Lake', 'Andrzej Sapkowski', '544', 'unread');
showLibraryInfo();
showBooksInLibrary();
deleteAllBooks();
