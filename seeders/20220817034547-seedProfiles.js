'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let seedProfile = JSON.parse(fs.readFileSync('./data/profile.json', 'utf-8')).map(el => {
    return { ... el, createdAt: new Date(), updatedAt: new Date()}
   })
  //  console.log(seedProfile)
   return queryInterface.bulkInsert('Profiles', seedProfile, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null)
  }
};
