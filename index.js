const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const authRoute = require('./routes/auth');
const users = require('./routes/users');
const movie = require('./routes/movies');
const list = require('./routes/list');

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', users);
app.use('/api/v1/list', list);

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        .then(() =>
                app.listen(port, ()=>{
                    console.log(`Server Running with Port ${port}...`);
                }),
                console.log(`Database connected...`)
            )
        .catch((error)=>console.log(error));
    } catch (error) {
        console.log(error);
    }
}

startServer()
