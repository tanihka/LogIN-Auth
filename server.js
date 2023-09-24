import express from 'express';
import dotenv from 'dotenv';
import DB_Connection from './DB.js';
import router from './Route/router.js';
import cors from 'cors';
dotenv.config()

const app = express();
const URL = process.env.DB;

DB_Connection(URL);
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use('/api/user', router)


app.listen(process.env.PORT, ()=>{
    console.log('server is running')
})