'use strict';

const bcrypt = require('bcrypt');
const { QueryInterface, Sequelize } = require('sequelize/types');

const userAttributes = {
  name: 'Bennison',
  email: 'bennisondevadoss@gmail.com',
  encrypted_password: bcrypt.hashSync('bennison', 10),
  role: 'Super Admin',
  created_at: new Date(),
  updated_at: new Date(),
  is_otp_verified: false
}

// async function generateHash(string, saltRounds = 10) {
//   const hashPassword = await new Promise((resolve) => {
//     bcrypt.hash(string, saltRounds).then((hash) => {
//       resolve(hash);
//     })
//   })
//   return hashPassword;
// }

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.bulkInsert('users', [{
      ...userAttributes,
    }])
  }
}