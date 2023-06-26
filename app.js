import express from 'express';
import Book from './model/Book.js';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose.connect('mongodb://localhost:27017/Books', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});

const initialBooks = [
    {
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kyosaki',
        genre: 'Finance',
        ISBN: '12345678',
        thumbnail:
            'https://cdn.kobo.com/book-images/ddf8d53d-7df5-4560-8fbd-43915f4f6a03/1200/1200/False/rich-dad-poor-dad-24.jpg',
        availability: true,
    },
    {
        title: 'Game of Thrones',
        author: 'George Martin',
        genre: 'Fantasy',
        ISBN: '72452482',
        thumbnail:
            'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
        availability: true,
    },

    {
        title: 'Twilight',
        author: 'Stephine',
        genre: 'Novel',
        ISBN: '296492149',
        thumbnail:
            'https://static.wikia.nocookie.net/twilightsaga/images/f/f8/Twilight_book_cover_%28second%29.jpg/revision/latest/scale-to-width-down/390?cb=20100330211533',
        availability: true,
    },
    { title: 'Zero to one', author: 'Heisenberg', genre: 'Finance', ISBN: '726919121', thumbnail: 'https://m.media-amazon.com/images/I/51JkDEpHUQL.jpg', availability: true },
    { title: 'Locke and Key', author: 'Bill Hijaker', genre: 'Fantasy', ISBN: '24124929', thumbnail: 'https://i0.wp.com/www.tor.com/wp-content/uploads/2014/12/WTL02.jpg?resize=516%2C800&type=vertical', availability: true },
    { title: 'Elon Musk', author: 'Ashlee vance', genre: 'Motivation', ISBN: '612496249', thumbnail: 'https://m.media-amazon.com/images/I/61ndSI8HmtL._AC_UF1000,1000_QL80_.jpg', availability: true },
    { title: 'Atomic Habits', author: 'James clear', genre: 'Self-Imrovement', ISBN: '21222022', thumbnail: 'https://www.booksfree.org/wp-content/uploads/2021/09/24.jpg', availability: true },
    { title: 'Millionaire Fastlane', author: 'Jack Dorsey', genre: 'Finance', ISBN: '425035283', thumbnail: 'image', availability: true },
    { title: 'Ikigai', author: 'Raymond hills', genre: 'Self-Improvement', ISBN: '32353253', thumbnail: 'https://cdn.shopify.com/s/files/1/0590/3830/2344/products/WebsiteNew_24.png?v=1661627991', availability: true },
    { title: 'Naruto', author: 'Minamato', genre: 'Anime', ISBN: '821423435', thumbnail: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg', availability: true },

];

// Remove existing books and insert new books
Book.deleteMany({})
    .then(() => {
        return Book.insertMany(initialBooks);
    })
    .then(() => {
        console.log('Books added to the database');
    })
    .catch((error) => {
        console.error('Error adding books:', error);
    });

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/books', (req, res) => {
    Book.find({})
        .then((books) => {
            res.json(books);
        })
        .catch((error) => {
            console.error('Error getting books:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
