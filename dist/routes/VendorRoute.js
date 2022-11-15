"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoute = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var controller_1 = require("../controller");
var CommonAuth_1 = require("../middleware/CommonAuth");
var multer_1 = __importDefault(require("multer"));
var ShoppingRoute_1 = require("./ShoppingRoute");
var router = express_1.default.Router();
exports.VendorRoute = router;
var imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../images"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
var images = (0, multer_1.default)({ storage: imageStorage }).array("images", 10);
router.post("/login", controller_1.VendorLogin);
router.use(CommonAuth_1.Authentication);
router.get("/profile", controller_1.GetVendorProfile);
router.patch("/porfile", controller_1.UpdateVendorProfile);
router.patch("/service", controller_1.UpdateVendorService);
router.post("/food", images, controller_1.AddFood);
router.post("/coverImage", images, controller_1.UpdateVendorCoverImage);
router.use(ShoppingRoute_1.ShoppingRoute);
//# sourceMappingURL=VendorRoute.js.map