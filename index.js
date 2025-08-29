let mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection
let connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Define a simple schema
let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
let User = mongoose.model("User", userSchema);

// Main function to demonstrate usage
let main = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("Connected to MongoDB successfully!");

    // Create a sample user
    let newUser = new User({
      name: "collins john",
      email: "john@example.com",
      age: 25,
    });

    // Save user to database
    let savedUser = await newUser.save();
    console.log("User created:", savedUser);

    // Find all users
    let users = await User.find();
    console.log("All users:", users);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log("Connection closed");
  }
};

// Run the main function
main();
