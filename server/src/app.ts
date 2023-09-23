import express, { Express, Request, Response,NextFunction } from "express";
import sequelize from "../sequelize-config";
require("dotenv").config();
const app: Express = express();
const port = process.env.PORT || 3000;
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes'
import Account from "./models/account";
import User from "./models/user";
app.use(express.json());
Account.associate({ User });
app.get("/api/sample", (req: Request, res: Response, next:NextFunction) => {
  res.json({ message: "This is a sample API endpoint." });
});
app.use('/api', userRoutes);
app.use('/api', accountRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Database connected.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
