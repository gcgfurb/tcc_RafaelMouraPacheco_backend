const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const dirname = path.resolve(__dirname, "..", "..");

module.exports = {
  dest: dirname,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dirname);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  })
};
