import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Author {
  id: string;
  name: string;
  bookIds: string[];
}

interface Book {
  id: string;
  title: string;
  chapters: number;
  pages: number;
  authorIds: string[];
}

const authors: Author[] = [];
const books: Book[] = [];

const app = express();
app.use(express.json());

app.post('/books', (req: Request, res: Response) => {
  const { title, chapters, pages, authorIds } = req.body;

  const book: Book = {
    id: uuidv4(),
    title,
    chapters,
    pages,
    authorIds
  };

  books.push(book);

  book.authorIds.forEach(au => {
    const author = authors.find(a => a.id === au);
    if (author) {
      author.bookIds.push(book.id);
    }
  });

  res.status(201).json(book);
});

app.get('/books', (req: Request, res: Response) => {
  res.json(
    books.map(book => ({
      ...book,
      authors: book.authorIds.map(authorId =>
        authors.find(author => author.id === authorId)
      )
    }))
  );
});

app.post('/authors', (req: Request, res: Response) => {
  const { name } = req.body;

  const author: Author = {
    id: uuidv4(),
    name,
    bookIds: []
  };

  authors.push(author);

  res.status(201).json(author);
});

app.get('/authors', (req: Request, res: Response) => {
  res.json(
    authors.map(author => ({
      ...author,
      books: author.bookIds.map(bookId =>
        books.find(book => book.id === bookId)
      )
    }))
  );
});

app.get('/books/:id/avg-pages-per-chapter', (req: Request, res: Response) => {
  const book = books.find(b => b.id === req.params.id);

  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  const avg = (book.pages / book.chapters).toFixed(2);

  res.json({ id: book.id, avg });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});