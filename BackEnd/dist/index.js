"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./config/db"));
const PagesRoutes_1 = require("./routes/PagesRoutes");
require("./config/transporter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "https://brainly-fe-delta.vercel.app",
        "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options(/.*/, (0, cors_1.default)());
console.log("ENV CHECK:", {
    projectId: process.env.FIREBASE_PROJECT_ID,
    email: process.env.FIREBASE_CLIENT_EMAIL,
    hasKey: !!process.env.FIREBASE_PRIVATE_KEY,
});
(0, db_1.default)();
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is alive on Vercel!" });
});
app.use("/api/v1", PagesRoutes_1.routes);
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Local server running on http://localhost:${PORT}`);
    });
}
exports.default = app;
