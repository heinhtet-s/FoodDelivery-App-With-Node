"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
var express_1 = __importDefault(require("express"));
var ShoppingController_1 = require("../controller/ShoppingController");
var router = express_1.default.Router();
exports.ShoppingRoute = router;
/* ------------------- Food Availability --------------------- */
router.get("/:pincode", ShoppingController_1.GetFoodAvailability);
/* ------------------- Top Restaurant --------------------- */
router.get("/top-restaurant/:pincode", ShoppingController_1.GetTopRestaurants);
/* ------------------- Food Available in 30 Minutes --------------------- */
router.get("/foods-in-30-min/:pincode", ShoppingController_1.GetFoodsIn30Min);
/* ------------------- Search Foods --------------------- */
router.get("/search/:pincode", ShoppingController_1.SearchFoods);
/* ------------------- Search Offers --------------------- */
router.get("/offers/:pincode", ShoppingController_1.GetAvailableOffers);
/* ------------------- Find Restaurant by ID --------------------- */
router.get("/restaurant/:id", ShoppingController_1.RestaurantById);
//# sourceMappingURL=ShoppingRoute.js.map