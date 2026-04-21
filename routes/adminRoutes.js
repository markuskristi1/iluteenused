const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const requireAuth = require("../middleware/requireAuth");

const adminController = require("../controllers/adminController");
const kontaktController = require("../controllers/adminKontaktController");
const adminHinnakiriController = require("../controllers/adminHinnakiriController");
const infoController = require("../controllers/adminInfoController");
const tehtudtoodController = require("../controllers/adminTehtudToodController");

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const category = req.body.category;

        if (category === "kuuned") {
            cb(null, path.join(__dirname, "../public/uploads/kuuned"));
        } else if (category === "juuksed") {
            cb(null, path.join(__dirname, "../public/uploads/juuksed"));
        } else {
            cb(new Error("Vale kategooria"), null);
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
        cb(null, uniqueName);
    }
});

const upload = multer({ storage }); */

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

router.get("/", requireAuth, adminController.dashboard);

router.get("/kontakt", requireAuth, kontaktController.getKontakt);
router.post("/kontakt", requireAuth, kontaktController.updateKontakt);

router.get("/hinnakiri", requireAuth, adminHinnakiriController.getHinnakiri);
router.post("/hinnakiri/item/add", requireAuth, adminHinnakiriController.addItem);
router.post("/hinnakiri/item/:id/update", requireAuth, adminHinnakiriController.updateItem);
router.post("/hinnakiri/item/:id/delete", requireAuth, adminHinnakiriController.deleteItem);

router.post("/hinnakiri/note/add", requireAuth, adminHinnakiriController.addNote);
router.post("/hinnakiri/note/:id/update", requireAuth, adminHinnakiriController.updateNote);
router.post("/hinnakiri/note/:id/delete", requireAuth, adminHinnakiriController.deleteNote);

router.get("/info", requireAuth, infoController.getInfo);
router.post("/info/add", requireAuth, infoController.addInfoItem);
router.post("/info/:id/update", requireAuth, infoController.updateInfoItem);
router.post("/info/:id/delete", requireAuth, infoController.deleteInfoItem);

router.get("/tehtudtood", requireAuth, tehtudtoodController.getTehtudtood);
router.post("/tehtudtood/upload", requireAuth, upload.single("image"), tehtudtoodController.uploadImage);
router.post("/tehtudtood/delete", requireAuth, tehtudtoodController.deleteImage);

module.exports = router;