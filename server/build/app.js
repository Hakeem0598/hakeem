"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const db_1 = __importDefault(require("./db"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const error_controller_1 = require("./controllers/error.controller");
// CONNECT TO DATABASE
(0, db_1.default)()
    .then(() => console.log('DB connection successful...'))
    .catch(err => console.log(err));
// CREATE SERVER
const app = (0, express_1.default)();
// GLOBAL MIDDLEWARES
app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)(config_1.corsConfig));
app.use((0, express_session_1.default)(config_1.sessionConfig));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// ROUTES
app.use('/api/v1', routes_1.default);
// UNDEFINED ROUTE MIDDLWARE
app.use('*', (req, res) => {
    const { method, originalUrl } = req;
    res.status(404).json({
        status: 'fail',
        message: `Cannot ${method} ${originalUrl}`
    });
});
// GLOBAL ERROR HANDLER
app.use('*', error_controller_1.globalErrorHandler);
// START THE SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
