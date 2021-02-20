const { db } = require('./db');
const app = require('./app');
const PORT = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

// db.sync({force: false})// if you update your db schemas, make sure you drop the tables first and then recreate them
// .then(function(){

// }
// app.listen(port, function () {
//   console.log('Knock, knock');
//   console.log("Who's there?");
//   console.log(`Your server, listening on port ${port}`);
// });

db.sync({ force: false }) // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log('db synced');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  });
