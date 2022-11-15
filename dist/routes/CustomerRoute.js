"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controller");
var CommonAuth_1 = require("../middleware/CommonAuth");
var router = express_1.default.Router();
exports.CustomerRoute = router;
router.post("/signup", controller_1.CustomerSignUp);
/* ------------------- Login --------------------- */
router.post("/login", controller_1.CustomerLogin);
/* ------------------- Authentication --------------------- */
router.use(CommonAuth_1.Authentication);
/* ------------------- Verify Customer Account --------------------- */
router.patch("/verify", controller_1.CustomerVerify);
/* ------------------- OTP / request OTP --------------------- */
router.get("/otp", controller_1.RequestOtp);
/* ------------------- Profile --------------------- */
router.get("/profile", controller_1.GetCustomerProfile);
router.patch("/profile", controller_1.EditCustomerProfile);
//# sourceMappingURL=CustomerRoute.js.map