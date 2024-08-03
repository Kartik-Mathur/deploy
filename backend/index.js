import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import loginRouter from './routers/login.js';
import restaurantRouter from "./routers/admin.js";
import { verifyJWT } from "./utils/verifyJWT.js";
import userRouter from "./routers/user.js";

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    credentials: true
}))
app.use(bodyParser.json({ limit: "4kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "4kb" }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/', loginRouter);
app.use('/restaurant', verifyJWT, restaurantRouter);
app.use('/app', verifyJWT, userRouter);

mongoose.connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Add a test route
app.get('/test', (req, res) => {
    res.json({ message: "API is working" });
});

app.listen(PORT);

export default app;