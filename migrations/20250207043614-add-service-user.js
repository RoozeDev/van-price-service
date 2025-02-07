const fs = require('fs');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    const servicePassword = fs.readFileSync('/run/secrets/db_service_user_password', 'utf8').trim();

    await db.command({
      createUser: 'van-price-service-user', // Username
      pwd: servicePassword, // Password
      roles: [
        {
          role: 'readWrite', // Example role
          db: 'van-price-service',  // Database to which the role applies
        },
      ],
    })
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
