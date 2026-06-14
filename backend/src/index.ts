import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";
import brainRoutes from "./routes/brain.routes";

const app = express();

/* Trust Proxy (Render) */
app.set("trust proxy", 1);

/* Security Headers */
app.use(helmet());

/* Prevent HTTP Parameter Pollution */
app.use(hpp());

/* Request Logger */
app.use(morgan("dev"));

/* Rate Limiting */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    success: false,

    message: "Too many requests. Try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,
});

app.use(limiter);

/* Body Parser + File Size Limit */
app.use(
  express.json({
    limit: "10kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "10kb",
  }),
);

/* Secure CORS */
app.use(
  cors({
    origin: "https://second-brain-app-gilt.vercel.app",

    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true,
  }),
);

/* Health Check */
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Second Brain API Running",
  });
});

/* Routes */
app.use("/api/v1", authRoutes);

app.use("/api/v1", contentRoutes);

app.use("/api/v1", brainRoutes);

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/* Global Error Handler */
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  },
);

/* Server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
