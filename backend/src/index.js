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
const PORT = process.env.PORT||4444;

app.use(cors({
    origin: ["https://deploy-2g6b1wf4u-kartik-mathurs-projects.vercel.app/"],
    credentials: true
}))
app.use(bodyParser.json({ limit: "4kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "4kb" }));
app.use(express.static('public')); // To store the information that front end might provide

app.use(cookieParser());

app.get('/',(req,res,next)=>{
    res.json({"msg":"Hello from express"});
})
app.use('/', loginRouter);
app.use('/restaurant', verifyJWT, restaurantRouter);
app.use('/app', verifyJWT, userRouter);


mongoose.connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`)
    .then(() => {
        app.listen(PORT, () => {
            console.log("http://localhost:" + PORT);
        })
    })
    .catch(err => {
        console.log(err);
    })

export default app;