"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sequelize = __importStar(require("sequelize"));
var process_1 = __importDefault(require("process"));
var env = process_1.default.env.NODE_ENV || 'development';
var basename = path_1.default.basename(__filename);
// tslint:disable-next-line: no-var-requires
var config = require(__dirname + "/../../db/config.json")[env];
console.log('config', process_1.default.env[config.use_env_variable]);
var ignoreFiles = [basename];
var db = {};
var dbConfig;
if (config.use_env_variable) {
    dbConfig = new sequelize.Sequelize(process_1.default.env[config.use_env_variable], config);
}
else {
    dbConfig = new sequelize.Sequelize(config.database, config.username, config.password, config);
}
// console.log("db------>", dbConfig)
fs_1.default.readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf('.') !== 0 &&
        ignoreFiles.indexOf(file) < 0 &&
        (file.slice(-3) === '.ts' || file.slice(-3) === '.js'));
})
    .forEach(function (file) {
    // console.log('files', file);
    var modelValue = require(path_1.default.join(__dirname, file));
    // console.log('modelValue=====>', modelValue);
    var model = modelValue.default(dbConfig);
    // console.log("model----->",model)
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = dbConfig;
db.Sequelize = sequelize.Sequelize;
exports.default = db;
