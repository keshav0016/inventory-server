'use strict';
const argon2=require('argon2')
 
    argon2.hash('admin')
    .then(hash=>{
      password = hash;
   
    })
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('users',[{
      user_id:'admin',
      password:password,  
     role:'admin',
     department:'hr'
   }],{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users',null,{})
  }
};
