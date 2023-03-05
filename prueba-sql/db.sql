CREATE TABLE books(
    id serial NOT NULL PRIMARY KEY,
    title varchar(60) not null,
    chapters int NOT NULL check(chapters >=0),
    pages int not null check(pages >=0),
);

CREATE TABLE authors(
    id serial NOT NULL PRIMARY KEY,
    author_name varchar(150) not null
);

CREATE TABLE books_authors(
    id_author int not null references authors(id),
    id_book int not null references books(id),
    PRIMARY key (id_author, id_book)
);

INSERT INTO books (title,chapters,pages) VALUES ('El Quijote',1000,10000);

INSERT INTO authors (author_name) VALUES ('M. Cervantes');

SELECT b.title,a.author_name from books_authors ba 
JOIN books b ON b.id=ba.id_book
JOIN authors a on a.id=ba.id_author;

SELECT *,pages/chapters as avg_pages_chapters books where books.title='El QUijote';

