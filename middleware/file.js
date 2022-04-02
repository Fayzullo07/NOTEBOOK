const multer = require("multer");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "images")
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + " " + file.originalname)
    }
});

const imgFilter = ['image/png', 'image/jpg', 'image/jpeg'];

const filterFile = (req, res, cb) => {
    if (imgFilter.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage: storage,
    filterFile: filterFile,
})