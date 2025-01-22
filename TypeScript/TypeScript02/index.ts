enum Genre {
  Fiction = "Fiction",
  NonFiction = "Non-Fiction",
  Mystery = "Mystery",
  Thriller = "Thriller",
  ScienceFiction = "Science Fiction",
  Fantasy = "Fantasy",
}

export type BookFormat = "Paperback" | "Hardcover" | "Ebook";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  quantity: number;
}

type LibraryBook = Book & { format: BookFormat };

interface Library {
  inventory: LibraryBook[];
}

const initialInventory: LibraryBook[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: Genre.Fiction,
    quantity: 5,
    format: "Paperback",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: Genre.ScienceFiction,
    quantity: 3,
    format: "Hardcover",
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: Genre.Mystery,
    quantity: 7,
    format: "Ebook",
  },
];

const library: Library = {
  inventory: initialInventory,
};

function displayBooks(): void {
  console.log("Library Inventory:");
  library.inventory.forEach((book) => {
    console.log(
      `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Quantity: ${book.quantity}, Format: ${book.format}`
    );
  });
}

function addBook(newBook: LibraryBook): void {
  library.inventory.push(newBook);
  console.log(`Book "${newBook.title}" added to the library!`);
}

function updateBookQuantity(bookId: number, quantity: number): void {
  const book = library.inventory.find((b) => b.id === bookId);
  if (book) {
    book.quantity = quantity;
    console.log(`Quantity updated for book "${book.title}".`);
  } else {
    console.log(`Book with ID ${bookId} not found.`);
  }
}

function removeBook(bookId: number): void {
  const index = library.inventory.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    const removedBook = library.inventory.splice(index, 1);
    console.log(`Book "${removedBook[0].title}" removed from the library.`);
  } else {
    console.log(`Book with ID ${bookId} not found.`);
  }
}

// Testing
displayBooks();
addBook({
  id: 4,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  genre: Genre.Fantasy,
  quantity: 10,
  format: "Hardcover",
});
displayBooks();
updateBookQuantity(1, 8);
removeBook(3);
displayBooks();
