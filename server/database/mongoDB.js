import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database Connected...");
    } catch (error) {
      console.log(`Error occured : ${error}`);
    }

}

export default connectDB