let mongoose = require("mongoose");
require("dotenv").config();

// Local MongoDB connection (fallback option)
let LOCAL_MONGODB_URI = "mongodb://localhost:27017/mongoose-demo";

let connectDB = async () => {
  try {
    // Try Atlas connection first, fallback to local
    let connectionString =
      process.env.MONGODB_CONNECTION_STRING || LOCAL_MONGODB_URI;

    let conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.log("\nTo fix this:");
    console.log("1. For MongoDB Atlas: Whitelist your IP address");
    console.log(
      "2. For local MongoDB: Install MongoDB locally and start the service"
    );
    console.log("3. Or use the mock demo: npm run mock");
    process.exit(1);
  }
};

// Define a simple schema
let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    age: {
      type: Number,
      required: true,
      min: [0, "Age cannot be negative"],
      max: [150, "Age seems unrealistic"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
let User = mongoose.model("User", userSchema);

// Main function
let main = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("\n=== MongoDB Operations Demo ===");

    // Clear existing data (for demo purposes)
    await User.deleteMany({});
    console.log("1. Cleared existing data");

    // Create multiple users
    let usersToCreate = [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        age: 28,
        isActive: true,
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        age: 32,
        isActive: true,
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        age: 25,
        isActive: false,
      },
    ];

    let createdUsers = await User.insertMany(usersToCreate);
    console.log("2. Created users:", createdUsers.length);

    // Find all active users
    let activeUsers = await User.find({ isActive: true });
    console.log("3. Active users:", activeUsers.length);

    // Find user by email
    let userByEmail = await User.findOne({ email: "alice@example.com" });
    console.log("4. User found by email:", userByEmail.name);

    // Update user
    let updatedUser = await User.findOneAndUpdate(
      { email: "bob@example.com" },
      { age: 33 },
      { new: true }
    );
    console.log("5. Updated user age:", updatedUser.age);

    // Count documents
    let userCount = await User.countDocuments();
    console.log("6. Total users in database:", userCount);

    console.log("\n=== Demo Complete ===");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    // Close connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("Connection closed");
    }
  }
};
