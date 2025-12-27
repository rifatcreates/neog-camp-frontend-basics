function saveDBToLocalStorage(db, key) {
  const data = db().get();
  localStorage.setItem(key, JSON.stringify(data));
}

function loadDBFromLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    return TAFFY(JSON.parse(storedData));
  }
  return TAFFY();
}

const STORAGE_KEY = "bookShelfDB";
const bookShelfDB = loadDBFromLocalStorage(STORAGE_KEY);

function autoSync(db, key, methodName) {
  const originalMethod = db[methodName];
  db[methodName] = function () {
    const result = originalMethod.apply(this, arguments);
    saveDBToLocalStorage(db, key);
    return result;
  };
}

autoSync(bookShelfDB, STORAGE_KEY, "insert");
autoSync(bookShelfDB, STORAGE_KEY, "update");
autoSync(bookShelfDB, STORAGE_KEY, "remove");

window.bookShelfDB = bookShelfDB;

if (bookShelfDB().count() === 0) {
  const initialBooks = [
    {
      book_id: 1,
      title: "Atomic Habits",
      description:
        "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
      category: "Self-Help",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
      rating: 3,
      likes: 145,
      created_at: "2025-04-01T09:00:00Z",
    },
    {
      book_id: 2,
      title: "Sapiens",
      description: "A Brief History of Humankind by Yuval Noah Harari.",
      category: "Science",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
      rating: 4,
      likes: 132,
      created_at: "2025-04-02T10:30:00Z",
    },
    {
      book_id: 3,
      title: "The Alchemist",
      description: "A novel by Paulo Coelho about following your dream.",
      category: "Fiction",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
      rating: 4,
      likes: 158,
      created_at: "2025-04-03T12:00:00Z",
    },
    {
      book_id: 4,
      title: "JS: The Good Parts",
      description: "JavaScript Concepts by Douglas Crockford.",
      category: "Other",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg",
      rating: 3,
      likes: 117,
      created_at: "2025-04-04T15:45:00Z",
    },
    {
      book_id: 5,
      title: "Ikigai",
      description: "The Japanese secret to a long and happy life.",
      category: "Self-Help",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/81l3rZK4lnL.jpg",
      rating: 5,
      likes: 98,
      created_at: "2025-04-06T10:00:00Z",
    },
    {
      book_id: 7,
      title: "1984",
      description: "A dystopian novel by George Orwell.",
      category: "Fiction",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
      rating: 3,
      likes: 143,
      created_at: "2025-04-08T14:00:00Z",
    },
    {
      book_id: 8,
      title: "The Psychology of Money",
      description: "Timeless lessons on wealth, greed, and happiness.",
      category: "Self-Help",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
      rating: 4,
      likes: 102,
      created_at: "2025-04-09T09:45:00Z",
    },
    {
      book_id: 9,
      title: "Clean Code",
      description:
        "A Handbook of Agile Software Craftsmanship by Robert C. Martin.",
      category: "Other",
      cover_url:
        "https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L.jpg",
      rating: 5,
      likes: 165,
      created_at: "2025-04-10T08:15:00Z",
    },
  ];

  for (let i = 0; i < initialBooks.length; i++) {
    bookShelfDB.insert(initialBooks[i]);
  }
}
