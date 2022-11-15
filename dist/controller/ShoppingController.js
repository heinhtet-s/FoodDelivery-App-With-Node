"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailableOffers = exports.RestaurantById = exports.SearchFoods = exports.GetFoodsIn30Min = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
var models_1 = require("../models");
var GetFoodAvailability = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, foodAvailability;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.body.pincode;
                return [4 /*yield*/, models_1.Vendor.find({
                        pincode: pincode,
                        serviceAvailable: true,
                    })
                        .sort({ rating: "descending" })
                        .populate("foods")];
            case 1:
                foodAvailability = _a.sent();
                if (foodAvailability.length > 0) {
                    return [2 /*return*/, res.json(foodAvailability)];
                }
                return [2 /*return*/, res.status(400).json({ message: "No food available" })];
        }
    });
}); };
exports.GetFoodAvailability = GetFoodAvailability;
var GetTopRestaurants = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, foodAvailability;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.body.pincode;
                return [4 /*yield*/, models_1.Vendor.find({
                        pincode: pincode,
                        serviceAvailable: true,
                    })
                        .limit(10)
                        .sort({ rating: "descending" })
                        .populate("foods")];
            case 1:
                foodAvailability = _a.sent();
                if (foodAvailability.length > 0) {
                    return [2 /*return*/, res.json(foodAvailability)];
                }
                return [2 /*return*/, res.status(400).json({ message: "No food available" })];
        }
    });
}); };
exports.GetTopRestaurants = GetTopRestaurants;
var GetFoodsIn30Min = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, foodAvailability, foodIn30Min;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.body.pincode;
                return [4 /*yield*/, models_1.Vendor.find({
                        pincode: pincode,
                        serviceAvailable: true,
                    })];
            case 1:
                foodAvailability = _a.sent();
                if (foodAvailability.length > 0) {
                    foodIn30Min = [];
                    foodAvailability.map(function (vendor) {
                        foodIn30Min.push.apply(foodIn30Min, vendor.foods.filter(function (food) { return food.deliveryTime <= 30; }));
                    });
                    return [2 /*return*/, res.json(foodIn30Min)];
                }
                return [2 /*return*/, res.status(400).json({ message: "No food available" })];
        }
    });
}); };
exports.GetFoodsIn30Min = GetFoodsIn30Min;
var SearchFoods = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pincode, foodAvailability, food;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pincode = req.body.pincode;
                return [4 /*yield*/, models_1.Vendor.find({
                        pincode: pincode,
                        serviceAvailable: true,
                    })];
            case 1:
                foodAvailability = _a.sent();
                if (foodAvailability.length > 0) {
                    food = [];
                    foodAvailability.map(function (vendor) {
                        food.push.apply(food, vendor.foods);
                    });
                    return [2 /*return*/, res.json(food)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.SearchFoods = SearchFoods;
var RestaurantById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, restaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, models_1.Vendor.findById(id).populate("foods")];
            case 1:
                restaurant = _a.sent();
                // restaurant = restaurant.populate("foods");
                if (restaurant) {
                    return [2 /*return*/, res.json(restaurant)];
                }
                return [2 /*return*/, res.status(400).json({ message: "No restaurant found" })];
        }
    });
}); };
exports.RestaurantById = RestaurantById;
var GetAvailableOffers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.GetAvailableOffers = GetAvailableOffers;
//# sourceMappingURL=ShoppingController.js.map