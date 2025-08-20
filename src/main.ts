import express, { Express, Router } from "express";
import router, { routerWebhook } from "./routes/Router";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', router);

app.use('', routerWebhook);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
