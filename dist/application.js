"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var server = fastify_1.default({
    logger: true
});
function build() {
    // fastify.register(require('./routes/books.routes'));
    // fastify.register(require('./routes/user-auth.routes'));
}
exports.default = build;
