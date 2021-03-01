// this means that we need to make sure our local NODE_ENV variable is in fact set to 'development'
// Node may have actually done this for you when you installed it! If not though, be sure to do that. (on command line, export NODE_ENV=development)
if (process.env.NODE_ENV === 'development') {
  console.log(
    'process.env.NODE_ENV is set to development, so loading local secrets'
  );
  require('./localSecrets'); // this will mutate the process.env object with your secrets.
} else {
  console.log(
    '!!! process.env.NODE_ENV is NOT set to development, so NOT loading local secrets'
  );
}

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
