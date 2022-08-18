'use strict';

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
   let data = [
    {
      name: 'super stay mate lipstic',
      UserId: 2,
      desc:'',
      price:20000,
      CategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://images.tokopedia.net/img/cache/500-square/product-1/2019/2/4/12714364/12714364_3c0aa84e-95fa-4a0d-b454-81478b205f11_1248_1248.jpg'
    }
   ]
   console.log(data);
   return queryInterface.bulkInsert('Products', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Products', null)
  }
};
