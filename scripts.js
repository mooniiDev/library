let myLibrary = [];

function Books(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// GET BOOKS FROM LOCAL STORAGE
if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}

function showLibraryInfo() {
  const booksRead = document.querySelector('#books-read');
  const booksUnread = document.querySelector('#books-unread');
  const totalBooks = document.querySelector('#total-books');
  let readCounter = 0;
  let unreadCounter = 0;
  booksRead.textContent = 0;
  booksUnread.textContent = 0;
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === true) {
      readCounter += 1;
      booksRead.textContent = readCounter;
    } else if (myLibrary[i].status === false) {
      unreadCounter += 1;
      booksUnread.textContent = unreadCounter;
    }
  }
  totalBooks.textContent = myLibrary.length;
}

function showBooksInLibrary() {
  showLibraryInfo();
  const bookList = document.querySelector('#table-body');
  bookList.textContent = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookRow = document.createElement('tr');
    bookRow.classList.add('book-info');
    bookList.appendChild(bookRow);
    // BOOK TITLE
    const bookTitle = document.createElement('td');
    bookTitle.textContent = myLibrary[i].title;
    bookRow.appendChild(bookTitle);
    // BOOK AUTHOR
    const bookAuthor = document.createElement('td');
    bookAuthor.textContent = myLibrary[i].author;
    bookRow.appendChild(bookAuthor);
    // BOOK PAGES
    const bookPages = document.createElement('td');
    bookPages.textContent = myLibrary[i].pages;
    bookRow.appendChild(bookPages);
    // BOOK STATUS BUTTON
    const bookStatus = document.createElement('td');
    const statusSymbol = document.createElement('i');
    if (myLibrary[i].status === false) {
      statusSymbol.classList.add('fas', 'fa-times');
    } else {
      statusSymbol.classList.add('fas', 'fa-check');
    }
    bookStatus.appendChild(statusSymbol);
    bookRow.appendChild(bookStatus);
    // BOOK REMOVAL BUTTON
    const bookDelete = document.createElement('td');
    const deleteSymbol = document.createElement('i');
    deleteSymbol.classList.add('fas', 'fa-trash-alt');
    bookDelete.appendChild(deleteSymbol);
    bookRow.appendChild(bookDelete);
  }
  // SAVE TO LOCAL STORAGE
  window.localStorage.setItem('books', JSON.stringify(myLibrary));
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Books(title, author, pages, status);
  myLibrary.push(book);
  showBooksInLibrary();
}

function getInputValue() {
  const titleInput = document.querySelector('#title');
  const nameInput = document.querySelector('#name');
  const numberInput = document.querySelector('#number');
  const checkbox = document.querySelector('input[name="checkbox"]');
  addBookToLibrary(titleInput.value, nameInput.value, numberInput.value, checkbox.checked);
}

// FORM VALIDATION
function validateForm(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll('.required');
  const validationTexs = document.querySelectorAll('.validation-text');
  const checkbox = document.querySelector('input[name="checkbox"]');
  let counter = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i].value === '') {
      validationTexs[i].style.display = 'block';
    } else if (inputs[i].value !== '') {
      validationTexs[i].style.display = 'none';
      counter += 1;
    }
  }
  if (counter === inputs.length) {
    getInputValue();
    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].value = '';
      validationTexs[i].style.display = 'none';
    }
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  }
}

// MODAL FOR BOOKS REMOVAL
function manipulateModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
  modal.addEventListener('click', (event) => {
    const { target } = event;
    if (target.classList.contains('close')) {
      modal.style.display = 'none';
    } else if (target.classList.contains('confirm-removal')) {
      myLibrary = [];
      modal.style.display = 'none';
    }
  });
}

function listenClicks() {
  document.addEventListener('click', (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === 'add-book') {
      validateForm(event);
    } else if (target.id === 'delete-all-btn') {
      manipulateModal();
    } else if (target.classList.contains('fa-trash-alt')) {
      myLibrary.splice(tr, 1);
    } else if (target.classList.contains('fa-check')) {
      target.classList.remove('fa-check');
      target.classList.add('fa-times');
      myLibrary[tr].status = false;
    } else if (target.classList.contains('fa-times')) {
      target.classList.remove('fa-times');
      target.classList.add('fa-check');
      myLibrary[tr].status = true;
    }
    showBooksInLibrary();
  });
}

window.onload = function clearInputs() {
  const inputs = document.querySelectorAll('.required');
  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].value = '';
  }
};

showBooksInLibrary();
listenClicks();
