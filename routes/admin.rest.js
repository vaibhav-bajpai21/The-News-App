const FeedService = require("../services/FeedService");
const path = require("path");
const requestValidator = require("../middlewares/requestValidators/Validation");
const multer = require('multer');
let imageDestinationFolder = "";
const _ = require("lodash");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        imageDestinationFolder = path.join(__dirname, '../temp-storage');
        cb(null, imageDestinationFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).any();

function loadRoutes(app) {
    /* Api to create feed article */
    app.post("/createArticle", upload, requestValidator.createArticleValidate,
        requestValidator.rejectIfInvalid, async (req, res) => {
            const feedServiceInst = new FeedService();
            try {
                let thumbnailObject = _.find(req.files, (file) => {
                    return (file.fieldname === "thumbnail")
                });
                if (Array.isArray(req.files) && (!req.files.length || _.isEmpty(thumbnailObject))) {
                    res.send({
                        status: "Error",
                        data: "thumbnail is mandatory"
                    });
                    return;
                }
                let reqObject = {
                    headline: req.body.headline,
                    category: req.body.category,
                    authorName: req.body.author_name
                }
                let response = await feedServiceInst.createArticle(reqObject, req.files);
                res.send(response);
            }
            catch (err) {
                res.send(err);
            }
        })
}

module.exports = loadRoutes;