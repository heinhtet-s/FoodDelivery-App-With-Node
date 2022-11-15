"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controller");
var router = express_1.default.Router();
exports.AdminRoute = router;
router.get("/vandor", controller_1.getVendors);
router.post("/vandor", controller_1.createVendor);
router.get("/vandor/:id", controller_1.getVendorByID);
//# sourceMappingURL=AdminRoute.js.map