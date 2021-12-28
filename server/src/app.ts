import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';

import db from './db';
import apiRouter from './routes';
import { corsConfig, sessionConfig } from './config';
import { globalErrorHandler } from './controllers/error.controller';


// CONNECT TO DATABASE
db()
.then(() => console.log('DB connection successful...'))
.catch(err => console.log(err));

// CREATE SERVER
const app = express();

// GLOBAL MIDDLEWARES
app.set('trust proxy', 1);
app.use(helmet());
app.use(morgan('dev'));
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/v1', apiRouter)

// UNDEFINED ROUTE MIDDLWARE
app.use('*', (req: Request, res: Response) => {
    const { method, originalUrl } = req;

    res.status(404).json({
        status: 'fail',
        message: `Cannot ${method} ${originalUrl}`
    })
})


// GLOBAL ERROR HANDLER
app.use('*', globalErrorHandler)

// START THE SERVER
const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})