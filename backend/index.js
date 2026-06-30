import "dotenv/config";
import express from "express";
import connectDB from "./connectDB.js";
import { router } from "./routes/url.router.js"; // ← moved to top with all imports
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message,
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed. Server not started.", error);
    process.exit(1);
  });
