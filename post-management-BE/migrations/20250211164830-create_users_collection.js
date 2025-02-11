module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Create the 'posts' collection
    await db.createCollection('posts');

    // Optionally, create indexes for better query performance (e.g., an index on the 'title' field)
    await db.collection('users').createIndex({ title: 1 });
    console.log('Users collection created and index added!');
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Drop the 'posts' collection in case of rollback
    await db.collection('users').drop();
    console.log('Users collection dropped!');
  }
};
