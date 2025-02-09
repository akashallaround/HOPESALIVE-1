import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/ConnectDB.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import incidentRoutes from "./Routes/incidentRoutes.js";
import ngoRoutes from "./Routes/NgoRoutes.js";
import volunteerRoutes from "./Routes/volunteerRoutes.js";
import cors from "cors";
import docuSignRoutes from "./Routes/docuSignRoutes.js";
import petRoutes from "./Routes/petRoutes.js";

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file.");
  process.exit(1);
}
if (!process.env.PORT) {
  console.error("❌ PORT is missing in .env file.");
  process.exit(1);
}

// Initialize app
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://hopes-alive.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/uploads", express.static("uploads"));
app.use("/api/docusign", docuSignRoutes);
app.use("/api/pets", petRoutes);

// Start server
app.listen(port, async () => {
  await connectDB(process.env.MONGODB_URI); // ✅ Pass MongoDB URI
  console.log(`🚀 Server is running on port ${port}`);
});

