import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config();


import dbConnect from "./config/db";
import { routes } from "./routes/PagesRoutes";


import "./config/transporter";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
  origin: [
    "https://brainly-fe-delta.vercel.app",   
    "http://localhost:5173",                 
    
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.options(/.*/, cors());


console.log("ENV CHECK:", {
  projectId: process.env.FIREBASE_PROJECT_ID,
  email: process.env.FIREBASE_CLIENT_EMAIL,
  hasKey: !!process.env.FIREBASE_PRIVATE_KEY,
});


dbConnect();


app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is alive on Vercel!" });
});

app.use("/api/v1", routes);


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Local server running on http://localhost:${PORT}`);
  });
}


export default app;