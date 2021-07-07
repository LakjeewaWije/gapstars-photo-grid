import mongoose from "mongoose";

export class DatabaseMongoDB {
  // Initialize your database connection
  public static init(): any {
    // mongo db link
    const dsn =
      "mongodb+srv://lakjeewa:qwerty%40123@cluster0.1h0mg.mongodb.net/gapstars-grid";
    const options = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
    };

    mongoose.connect(dsn, options, (error) => {
      // handle the error
      if (error) {
        console.error("Failed to connect to the database server!!");
        throw error;
      } else {
        console.info("Connected to database server at: " + dsn);
      }
    });
  }
}

export default mongoose;
