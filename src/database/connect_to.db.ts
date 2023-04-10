import mongoose from "mongoose";
const options = {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  autoIndex: true, //this is the code I added that solved it all
  // keepAlive: true,
  // poolSize: 10,
  // bufferMaxEntries: 0,
  // connectTimeoutMS: 10000,
  // socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  // useFindAndModify: false,
  // useUnifiedTopology: true,
};

export async function connectToCluster(uri: string) {
  console.log("Connecting to MongoDB Atlas cluster...");
  // if (mongoose.connection) {
  //   console.log(mongoose.connection);
  //   return mongoose.connection.;
  // }
  return mongoose.connect(uri, options, (err) => {
    if (err) {
      console.error("Connection to MongoDB Atlas failed!", err), process.exit();
    } else console.log("mongdb is connected");
  });
}
