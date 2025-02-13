const bcrypt = require('bcrypt');
module.exports = {

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {

    const users = [
      {
        email: 'superadmin@gmail.com',
        name: 'Super Admin',
        password: 'Abcdef@123',
        role: 'superadmin'
      }, {
        email: 'admin@gmail.com',
        name: 'Admin',
        password: 'Abcdef@123',
        role: 'admin'
      }, {
        email: 'user@gmail.com',
        name: 'User',
        password: 'Abcdef@123',
        role: 'user'
      }
    ]

    let usersWithHashedPassword = users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      return user;
    })

    usersWithHashedPassword = await Promise.all(usersWithHashedPassword);
    await db.collection('users').insertMany(usersWithHashedPassword);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('users').deleteMany({});
  }
};
