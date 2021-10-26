const createError = require("http-errors");

let bookList = [];
let idno = 0;

exports.index = function (req, res) {
  res.send(bookList);
};

exports.create = function (req, res, next) {
  if (!req.body.name) {
    return next(createError(400, "Name is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "Author is required"));
  }
  if (!req.body.read) {
    return next(createError(400, "Read status is required"));
  }
  if (req.body.read == "read" && !req.body.rating) {
    return next(createError(400, "Rating is required"));
  }

  bookList.push({
    id: idno,
    name: req.body.name,
    author: req.body.author,
    read: req.body.read,
    rating: req.body.rating,
  });
  res.send({ result: true });
  idno++;
};

exports.show = function (req, res, next) {
  const bookItem = bookList.find((book) => book.id == req.params.id);
  if (!bookItem) {
    return next(createError(404, "No book with that id"));
  }
  res.send(bookItem);
};

exports.delete = function (req, res, next) {
  const bookItem = bookList.find((book) => book.id == req.params.id);
  if (!bookItem) {
    return next(createError(404, "No book with that id"));
  }
  bookList = bookList.filter((book) => book.id != req.params.id);
  res.send({ result: true });
};

exports.update = function (req, res, next) {
  const bookItem = bookList.find((book) => book.id == req.params.id);
  if (!req.body.name) {
    return next(createError(400, "name is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  if (!req.body.read) {
    return next(createError(400, "read status is required"));
  }
  if (!req.body.rating) {
    return next(createError(400, "read status is required"));
  }
  if (!bookItem) {
    return next(createError(404, "no book with that id"));
  }

  bookList = bookList.map((book) => {
    if (book.id == req.params.id) {
      book.name = req.body.name;
    }
    if (book.id == req.params.id) {
      book.author = req.body.author;
    }
    if (book.id == req.params.id) {
      book.read = req.body.read;
    }
    if (book.id == req.params.id) {
      book.rating = req.body.rating;
    }
    return book;
  });
  res.send({ result: true });
};
