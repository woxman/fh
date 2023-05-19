"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Defining environment variables and connecting to db
dotenv_1.default.config();
require("./db");
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./utils/config"));
const server = (0, express_1.default)();
server.use(express_1.default.json({ limit: '50mb' }));
server.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
server.use((0, cors_1.default)());
// Logging requests
server.use(express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console()
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json(), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
    meta: true,
    msg: "HTTP {{req.method}} {{res.statusCode}} {{req.url}}",
    expressFormat: false,
    colorize: true,
    // ignoreRoute: function (req, res) { return false } // optional: allows to skip some log messages based on request and/or response
}));
// Configuring swagger ui and swagger jsdoc
const swaggerJsdocOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'hadad node api',
            version: '1.0.0',
        },
    },
    apis: [
        path_1.default.join(__dirname, 'controllers', '*', 'index.js'),
        path_1.default.join(__dirname, 'controllers', '*', '*', 'index.js')
    ]
};
const swaggerSpecification = (0, swagger_jsdoc_1.default)(swaggerJsdocOptions);
const swaggerUiOptions = {
    explorer: true,
    swaggerOptions: {
        docExpansion: 'none'
    }
};
server.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecification, swaggerUiOptions));
server.use(routes_1.default);
server.get('/', (req, res) => {
    res.status(200).send();
});
// Logging errors
server.use(express_winston_1.default.errorLogger({
    transports: [
        new winston_1.default.transports.Console()
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json())
}));
const port = (config_1.default.port || 3000);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
