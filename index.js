const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/addUser', async (req, res) => {
    try {
        console.log('Received user data:', req.body); // Log the received user data
        await client.connect();
        const database = client.db('userDatabase');
        const collection = database.collection('users');

        const user = req.body; // Get user data from request body
        user.age = Number(user.age); // Ensure age is a number
        await collection.insertOne(user);
        console.log('User inserted successfully');

        res.status(201).send('User added successfully');
    } catch (err) {
        console.log('Error adding user:', err); // Log the error
        res.status(500).send('Error adding user');
    } finally {
        await client.close();
    }
});

app.get('/aggrigate', async (req, res) => {
    try {
        await client.connect();
        // Create or use userDatabase database
        const database = client.db('userDatabase');
        // Create or use users collection
        const collection = database.collection('users');

        // Aggregation pipeline to calculate the average age of users in different cities
        const aggregationPipepline = [
            // Use $avg to calculate the average age
            { $group: { _id: "$city", averageAge: { $avg: "$age" } } },
            { $sort: { averageAge: -1 } }
        ];

        // Perform aggregation
        const results = await collection.aggregate(aggregationPipepline).toArray();

        // Log the results
        console.log(`Average age of users in different cities: `);
        results.forEach(result => {
            console.log(`City: ${result._id}, Average Age: ${result.averageAge}`);

        });
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error performing aggrigation');
    } finally {
        await client.close();
    }
});
