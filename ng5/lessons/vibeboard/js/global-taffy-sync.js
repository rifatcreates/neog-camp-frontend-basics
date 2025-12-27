function saveDBToLocalStorage(db, key) {
  var data = db().get();
  localStorage.setItem(key, JSON.stringify(data));
}

function loadDBFromLocalStorage(key) {
  var storedData = localStorage.getItem(key);
  if (storedData) {
    return TAFFY(JSON.parse(storedData));
  }
  return TAFFY();
}

function autoSync(db, key, methodName) {
  let originalMethod = db[methodName];
  db[methodName] = function () {
    let result = originalMethod.apply(this, arguments); // Use 'this' instead of 'db'
    saveDBToLocalStorage(db, key); // Save after operation
    return result;
  };
}

var STORAGE_KEY = "vibeBoardDB";
var vibeBoardDB = loadDBFromLocalStorage(STORAGE_KEY);

// Apply sync wrappers to insert, remove
autoSync(vibeBoardDB, STORAGE_KEY, "insert");
autoSync(vibeBoardDB, STORAGE_KEY, "remove");

function hookUpdateAndRemoveWithSync(db, key) {
  const selection = db();

  const originalUpdate = selection.update;
  const originalRemove = selection.remove;

  selection.update = function () {
    const result = originalUpdate.apply(this, arguments);
    saveDBToLocalStorage(db, key);
    return result;
  };

  selection.remove = function () {
    const result = originalRemove.apply(this, arguments);
    saveDBToLocalStorage(db, key);
    return result;
  };
}

hookUpdateAndRemoveWithSync(vibeBoardDB, STORAGE_KEY);

window.vibeBoardDB = vibeBoardDB;

if (vibeBoardDB().count() === 0) {
  const initialGifs = [
    {
      gif_id: 1,
      title: "Excited Reaction",
      description: "A hilarious reaction GIF that captures an exciting moment.",
      category: "Reaction",
      gif_url:
        "https://ditchthattextbook.com/wp-content/uploads/2021/01/excited-anna-gif.gif",
      rating: 3.5,
      likes: 120,
      created_at: "2025-04-01T12:00:00Z",
    },
    {
      gif_id: 2,
      title: "Cute",
      description: "A cutie listening to music.",
      category: "Cute",
      gif_url:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHZvMm8ycWd5amdpajlnN214aHV1eWc1MXRrcHhnbmdxeGk3b3plbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6FxJBpNTBgWdJCXKD4/giphy.gif",
      rating: 4.8,
      likes: 150,
      created_at: "2025-04-02T09:30:00Z",
    },
    {
      gif_id: 3,
      title: "Mind Blown",
      description: "A mind-blown reaction GIF, perfect for shocking facts.",
      category: "Reaction",
      gif_url:
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmUycGpmbnU3emVvZm1qdjk0cHlsajJlaWlzZTRma3gyN2Ftemx2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NtY188QaxDdC/giphy.gif",
      rating: 4.2,
      likes: 100,
      created_at: "2025-04-03T08:20:00Z",
    },
    {
      gif_id: 4,
      title: "Coding Cat",
      description: "The classic meme of the cat coding.",
      category: "Meme",
      gif_url:
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmppMnB5bWk3azBzZXZramExZWM4MWtmczc3ajVtMnhtYm4zNWV5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o0vwzuFwCGAFO/giphy.gif",
      rating: 4.7,
      likes: 200,
      created_at: "2025-04-03T10:00:00Z",
    },
    {
      gif_id: 5,
      title: "Other",
      description: "Happy dance.",
      category: "Other",
      gif_url:
        "https://i.pinimg.com/originals/64/45/ee/6445ee2274a782a7c528303e9bd823d7.gif",
      rating: 3.8,
      likes: 100,
      created_at: "2025-05-02T09:30:00Z",
    },
    {
      gif_id: 6,
      title: "Happy Avacado",
      description: "Happy Avacado",
      category: "Other",
      gif_url:
        "https://cdn.pixabay.com/animation/2022/10/11/09/05/09-05-26-529_512.gif",
      rating: 4.8,
      likes: 130,
      created_at: "2025-05-08T09:30:00Z",
    },
    {
      gif_id: 7,
      title: "Coffee",
      description: "Hot Coffee",
      category: "Other",
      gif_url:
        "https://blog.aweber.com/wp-content/uploads/2022/09/content-8871-warm-beverage_gif-600x600-1.gif",
      rating: 4.3,
      likes: 150,
      created_at: "2025-05-07T09:30:00Z",
    },
    {
      gif_id: 8,
      title: "Sunset",
      description: "Sunset",
      category: "Other",
      gif_url:
        "https://i.pinimg.com/originals/aa/62/ee/aa62ee27afb2a97fa4c1f938dd57f78f.gif",
      rating: 3.3,
      likes: 70,
      created_at: "2025-05-06T09:30:00Z",
    },
    {
      gif_id: 9,
      title: "Atom",
      description: "Atom",
      category: "Meme",
      gif_url:
        "https://i.pinimg.com/originals/7f/b0/1e/7fb01e9423c6739589232ad3a14b8836.gif",
      rating: 4.3,
      likes: 170,
      created_at: "2025-05-06T09:30:00Z",
    },
    {
      gif_id: 10,
      title: "Cute and Happy",
      description: "A cute cat.",
      category: "Cute",
      gif_url:
        "https://i.pinimg.com/originals/39/d9/d1/39d9d12f7360ee2650b039818da184f0.gif",
      rating: 4.2,
      likes: 120,
      created_at: "2025-05-06T08:30:00Z",
    },
    {
      gif_id: 11,
      title: "Angry Cat",
      description: "A cute angry cat.",
      category: "Reaction",
      gif_url:
        "https://i.pinimg.com/originals/e3/f5/8b/e3f58b48bdff6ab118e4a089035dfd6f.gif",
      rating: 4.0,
      likes: 125,
      created_at: "2025-05-07T08:30:00Z",
    },
    {
      gif_id: 12,
      title: "Freedom",
      description: "A man running away with freedom.",
      category: "Meme",
      gif_url: "https://media.tenor.com/_6WNBQvc9XAAAAAM/bts-freedom.gif",
      rating: 3.9,
      likes: 135,
      created_at: "2025-05-08T08:30:00Z",
    },
  ];

  let i = 0;
  while (i < initialGifs.length) {
    vibeBoardDB.insert(initialGifs[i]);
    i++;
  }
}
