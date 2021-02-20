const Sequelize = require('sequelize');

const db = new Sequelize( //edit the defaultDb to your current db name
  process.env.DATABASE_URL || 'postgres://localhost:5432/defaultDb',
  {
    logging: false, // unless you like the logs
    // ...and there are many other options you may want to play with
  }
);

module.exports = db;
