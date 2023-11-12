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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRepository_1 = require("../db/userRepository");
const errors_1 = require("../errors");
const user_1 = __importDefault(require("../schemas/user"));
const hash_1 = require("../utils/hash");
const utils_1 = require("../auth/utils");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const SALT = process.env.SALT || '450d0b0db2bcf4adde5032eca1a7c416e560cf44';
const router = express_1.default.Router();
/**
 * Normally the implementation of the handler functions are done in separate files
 * for simplicity we have merged control layer and service layer into 1 file
 */
// added authentication middleware, to allow only authenticated users to view this code
router.get('/:id', authentication_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, userRepository_1.getUserById)(id);
    if (result.rowCount === 0) {
        throw new errors_1.BadRequestError(`User ${id} was not found`);
    }
    const user = result.rows[0];
    // in case we wanted the user to see only his data
    // we would compare the id from {user} and the id from the {req} (that came from the token)
    // if they are not equal we would return {new UnauthorizedError()}
    res.status(200).json(Object.assign({ id: user.id, firstName: user.firstName, lastName: user.lastName, marketingConsent: user.marketingConsent }, (user.marketingConsent && { email: user.email }) // include the email if marketingConsent is true
    ));
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    // I haven't implemented validation like this method before, I belive there is a better way to handle this.
    // the major problem is how we return the error
    try {
        // zod schema will validate each field and return a message
        user_1.default.omit({ id: true }).parse(user);
    }
    catch (error) {
        const err = error;
        const errorsArr = err.errors.map((e) => `${e.path}: ${e.message}`);
        throw new errors_1.BadRequestError(errorsArr.join(','));
    }
    const id = (0, hash_1.hashSHA1)(user.email, SALT);
    const newUser = Object.assign(Object.assign({}, user), { id });
    // there must be a better way to handle database errors
    try {
        yield (0, userRepository_1.saveUser)(newUser);
    }
    catch (error) {
        // @ts-ignore - I couldn't find the type for the error thrown by pg
        if ((error === null || error === void 0 ? void 0 : error.code) === '23505') {
            throw new errors_1.BadRequestError("email already exists");
        }
        throw error;
    }
    const token = (0, utils_1.createAccessToken)(newUser);
    res.status(201).json({ id, token });
}));
exports.default = router;
