import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import * as sequelize from 'sequelize';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
console.log('env', env);
const basename = path.basename(__filename);
// tslint:disable-next-line: no-var-requires
const config = require(`${__dirname}/../../db/config.json`)[env];
// console.log("config", process.env[config.use_env_variable]);
console.log('Config is', config);
const ignoreFiles = [basename];
const db: any = {};

let dbConfig: any;
if (config.use_env_variable) {
  dbConfig = new sequelize.Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  dbConfig = new sequelize.Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf('.') !== 0 &&
      ignoreFiles.indexOf(file) < 0 &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js')
    );
  })
  .forEach((file: any) => {
    // console.log('files', file);
    const modelValue = require(path.join(__dirname, file));
    console.log('modelValue=====>', modelValue);
    const model = modelValue.default(dbConfig);
    console.log('model----->', model);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = dbConfig;
db.Sequelize = sequelize.Sequelize;

export default db;
