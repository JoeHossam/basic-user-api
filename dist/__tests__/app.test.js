"use strict";
/**
 * The following tests directly manipulate the database which is not good
 * other alternatives are
 * - mock database responses
 * - use test db
 * - use temp db
 */
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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("..")); // Adjust the path accordingly
// used to make the email unique each time
let counter = 0;
const newUser = {
    "firstName": "Michael",
    "lastName": "Knight",
    "email": "youssefhossam89.test.account@gmail.com",
    "marketingConsent": false
};
describe('GET /', () => {
    it('should respond with 404 NOT FOUND', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(__1.default).get('/');
        expect(response.status).toBe(404);
    }));
});
describe('GET /api/v1/user/{id}', () => {
    it('should respond with 401 UNAUTHENTICATED', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(__1.default).get('/api/v1/user/178263');
        expect(response.status).toBe(401);
    }));
});
describe('POST /api/v1/user', () => {
    it('should create account, respond with 201 CREATED', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(__1.default)
            .post('/api/v1/user')
            .set('Content-Type', 'application/json')
            .send(Object.assign(Object.assign({}, newUser), { email: counter + newUser.email })); // hack to evade duplicate values 
        expect(response.status).toBe(201);
    }));
    it('should create account, respond with 400 BAD REQUEST', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(__1.default)
            .post('/api/v1/user')
            .set('Content-Type', 'application/json')
            .send(newUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("email already exists");
    }));
    counter++;
});
describe('FULL TEST', () => {
    it('should create account and get user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(__1.default)
            .post('/api/v1/user')
            .set('Content-Type', 'application/json')
            .send(Object.assign(Object.assign({}, newUser), { email: counter + newUser.email }));
        expect(response.status).toBe(201);
        const getResponse = yield (0, supertest_1.default)(__1.default)
            .get('/api/v1/user/178263')
            .set('Authorization', `Bearer ${response.body.token}`);
        expect(getResponse.status).toBe(200);
    }));
});
