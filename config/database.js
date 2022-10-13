// const mongoose = require("mongoose");
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.DB_STRING, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const uri = process.env.DB_STRING;
const client = new MongoClient(uri);



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    client.connect(err => {
      if(err){ console.error(err); return false;}
      // connection to mongo is successful, listen for requests
      app.listen(3000, () => {
          console.log("listening for requests");
      })
    });
   
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;
