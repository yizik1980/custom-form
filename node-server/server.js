import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./router/user.router.js";
import dotenv from "dotenv";
import inputRoutes from "./router/input.router.js";

dotenv.config({ path: "./.env" });
const connectionString = process.env.MONGO_CONNECTION_STRING;

// or: dotenv.config({ path: new URL('./.env', import.meta.url).pathname });
const app = express();
const corsOptions = { preflightContinue: true };
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoutes);
app.use("/api/inputs", inputRoutes);
// Health
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Simple Express API" });
});

const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);
// Start server
// simple request logger middleware
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on("finish", () => {
    const [s, ns] = process.hrtime(start);
    const ms = (s * 1e3 + ns / 1e6).toFixed(3);
    const bodyPreview =
      req.body && Object.keys(req.body).length
        ? ` body=${JSON.stringify(req.body)}`
        : "";
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms${bodyPreview}`
    );
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
