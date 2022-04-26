'use strict';

const bcrypt = require('bcrypt');
// const { queryInterface, Sequelize } = require('sequelize/types');

const userAttributes = {
  name: 'ben',
  email: 'bennisondevadoss2018@gmail.com',
  encrypted_password: bcrypt.hashSync('bennison', 10),  //bennison
  organization_id: 1,
  role: 'Super Admin',
  created_at: new Date(),
  updated_at: new Date(),
  // is_otp_verified: false
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
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      ...userAttributes,
    }])
  }
}
