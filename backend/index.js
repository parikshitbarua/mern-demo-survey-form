import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import surveyRouter from "./routes/survey.route.js";
import authRouter from "./routes/auth.route.js";
import { initDb } from "./connections/db.connection.js";

const app = Express();
app.use(bodyParser.json());

app.use(cors({
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
        return callback(null, true);
    },
    credentials: true
}));

app.use('/auth', authRouter);
app.use('/v1/survey', surveyRouter);

const db = await initDb();
if (db) {
  app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
 });
} else {
  console.log("Database connection failed");
}

