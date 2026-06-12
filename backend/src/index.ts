import "dotenv/config";

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";
import brainRoutes from "./routes/brain.routes";

const app = express();

app.use(express.json());
app.use(cors());

/* Routes */
app.use("/api/v1", authRoutes);
app.use("/api/v1", contentRoutes);
app.use("/api/v1", brainRoutes);

/* Server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
