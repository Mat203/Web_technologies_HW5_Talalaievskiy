class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = true;
    }

    toggleFavorite() {
        this.isFavorite = true;
    }
}

class Bookshelf {
    constructor(books = []) {
        this.books = books;
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    getUnreadBooks() {
        return this.books.filter(book => !book.isRead);
    }

    getFavBooks() {
        return this.books.filter(book => book.isFavorite);
    }
}

const shelf = new Bookshelf([]);
const bookshelfDiv = document.getElementById('bookshelf');
const addBookForm = document.getElementById('addBookForm');

function concatenateString(text, maxLength) {
    return text.substring(0, maxLength) + '...';
}

function addBook() {
    const title = document.getElementById('title').value;
    const authors = document.getElementById('authors').value;
    const numberOfPages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    const isFavorite = document.getElementById('isFavorite').checked;

    const newBook = new Book(title, authors, numberOfPages, isRead, isFavorite);
    shelf.addBook(newBook);
    displayBookshelf();
}

function displayBookshelf() {
    bookshelfBody.innerHTML = '';

    shelf.books.forEach((book, index) => {
        const bookRow = document.createElement('tr');
        const authors = concatenateString(book.authors, 5);
        bookRow.innerHTML = `
        <td>${book.title}</td>
        <td>${authors}</td>
        <td>${book.numberOfPages}</td>
        <td>${book.isRead ? 'Yes' : 'No'}</td>
        <td>${book.isFavorite ? 'Yes' : 'No'}</td>
        <td>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="markAsRead(${index})">Mark as Read</button>
            <button onclick="toggleFavorite(${index})">Toggle Favorite</button>
        </td>
      `;
        bookshelfBody.appendChild(bookRow);
    });
    updateTotalBooks();
}

function removeBook(index) {
    shelf.removeBook(shelf.books[index]);
    displayBookshelf();
    updateTotalBooks();
}

function markAsRead(index) {
    shelf.books[index].markAsRead();
    displayBookshelf();
}

function toggleFavorite(index) {
    shelf.books[index].toggleFavorite();
    displayBookshelf();
}

function alertUnreadBooks() {
    const unreadBooks = shelf.getUnreadBooks();
    alert(`Number of unread books: ${unreadBooks.length}`);
}

function alertFavoriteBooks() {
    const favoriteBooks = shelf.getFavBooks();
    alert(`Number of favorite books: ${favoriteBooks.length}`);
}

function updateTotalBooks() {
    const totalBooks = document.getElementById('totalBooks');
    totalBooks.textContent = shelf.books.length;
}
