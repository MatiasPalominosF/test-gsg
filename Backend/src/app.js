import express from "express";
import config from "./config";
import historicalRoutes from "./routes/historical.routes";
import symbolsRoutes from "./routes/symbols.routes";
import cors from "cors";

const app = express();

//settings
app.set("port", config.port || 3000);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(historicalRoutes);
app.use(symbolsRoutes);

export default app;
