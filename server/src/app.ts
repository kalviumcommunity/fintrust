import express, { Express } from "express";
require("dotenv").config();
const app: Express = express();
const port = process.env.PORT || 3000;
import userRoutes from "./routes/userRoutes";
import accountRoutes from "./routes/accountRoutes";

import { connection } from "../config/config";
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);

connection.connect(async (err: any) => {
  if (err) {
    console.error(
      `Error connecting to the database: ${process.env.DB_NAME}`,
      err
    );
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

    console.log(`Connected to the database: : ${process.env.DB_NAME}`);
  }
});
