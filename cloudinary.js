import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dambcqxsg",
  api_key: "263944386145145",
  api_secret: "nY_dvIcuSrUxbeTwLmjMuapmMeM",
});

const opts = {
  overWrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "img",
};

const cloudinaryFn = (image) => {
  //image is converted base64
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

export default cloudinaryFn;
