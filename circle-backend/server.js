import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dmRoutes from "./routes/dmRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, httpServer } from "./socket/socket.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 9000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const swaggerDocument = YAML.load("./swagger.yaml");

//Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", dmRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

httpServer.listen({ port: PORT, host: "0.0.0.0" }, () =>
  console.log(`Server started at http://0.0.0.0:${PORT}`)
);
