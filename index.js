import Express from "express";
import bodyParser from "body-parser";

import surveyRouter from "./routes/survey.route.js";
import { initDb } from "./connections/db.connection.js";

const app = Express();
app.use(bodyParser.json());

app.use('/v1/survey', surveyRouter);

const db = await initDb();
if (db) {
  app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
 });
} else {
  console.log("Database connection failed");
}

