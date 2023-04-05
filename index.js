import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
//const uploadImage = require("./cloudinary.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/api/uploadImage", async (req, res) => {
  try {
    const { image } = req.body;
    const uploadedResponse = await cloudinary.uploader.upload(image);
    res.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected");
});
