const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { Outfit } = require('./models');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/new-outfit/:outfit', (req, res) => {
    const newOutfit = new Outfit({ name: req.params.genre });
    newOutfit.save();
    if (newOutfit) {
        res.status(200).json(newOutfit);
    } else {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/all-outfits', async  (req, res) => {
    try {
        const result = await Outfit.find({});
        res.status(200).json(result);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/find-top-outfit', async (req, res) => {
    try {
        const result = await Outfit.findOne({ name: 'top' });
        res.status(200).json(result);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/find-bottom-outfit', async (req, res) => {
    try {
        const result = await Outfit.findOne({ name: 'bottom' });
        res.status(200).json(result);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/find-shoes-outfit', async (req, res) => {
    try {
        const result = await Outfit.findOne({ name: 'shoes' });
        res.status(200).json(result);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.delete('/find-one-delete/:outfit', async (req, res) => {
    try {
        const result = await Outfit.findOneAndDelete({ name: req.params.outfit });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/find-one-update/:outfit', async (res, req) => {
    try {
        const { outfit } = req.params;
        const updatedDocument = await Outfit.findOneAndUpdate(
            { name: 'top' },
            { name: outfit },
            { new: true }
        );
        res.json(updatedDocument);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/find-one-update/:outfit', async (res, req) => {
    try {
        const { outfit } = req.params;
        const updatedDocument = await Outfit.findOneAndUpdate(
            { name: 'bottom' },
            { name: outfit },
            { new: true }
        );
        res.json(updatedDocument);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/find-one-update/:outfit', async (res, req) => {
    try {
        const { outfit } = req.params;
        const updatedDocument = await Outfit.findOneAndUpdate(
            { name: 'shoes' },
            { name: outfit },
            { new: true }
        );
        res.json(updatedDocument);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use Graph at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer();