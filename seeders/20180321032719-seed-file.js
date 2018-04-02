
const argon2=require('argon2')

   
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    var hashedPassword 
     argon2.hash('waladmin')
     .then(hash => {
       return queryInterface.bulkInsert('users',[{
         user_id:'Admin',
         password:hash,  
         role:'Admin',
         department:'HR'
       }],{});
    })
       
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users',null,{})
  }
};
