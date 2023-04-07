import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import uploadImgRoutes from "./routes/uploadImg.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";
//const uploadImage = require("./cloudinary.js");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({}));

app.use(express.json());
app.use(cookieParser());

// app.post("/api/uploadImage", async (req, res) => {
//   try {
//     const { image } = req.body;
//     const uploadedResponse = await cloudinary.uploader.upload(image);
//     res.json({ url: uploadedResponse.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

app.use("/api/upload", uploadImgRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected");
});
