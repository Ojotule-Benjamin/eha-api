import db from "../db.js";
import jwt from "jsonwebtoken";
import cloudinaryFn from "../cloudinary.js";

//CRUD Operations are carried out in controllers

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? `SELECT * FROM posts WHERE cat=${req.query.cat}`
    : "SELECT * FROM posts";
  try {
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log("getPosts:::", error);
  }
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = async (req, res) => {
  // const returnedUlr = await cloudinaryFn(req.body.imgUrl);
  // const q = "INSERT INTO posts(`title`, `img`, `cat`) VALUES (?)";
  // const values = [req.body.title, returnedUlr, req.body.cat];
  // db.query(q, [values], (err, data) => {
  //   if (err) return res.json(err);
  //   return res.status(200).json("User has been created!");
  // });
  //res.json("from controller");

  const token = req.headers.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  console.log(res);

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?  ";

    const values = [res.body.title, res.body.desc, res.body.img, res.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been updated");
    });
  });
};
