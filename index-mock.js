let mongoose = require("mongoose");

// Mock connection for demonstration (without actual database connection)
let demonstrateMongoose = async () => {
  try {
    console.log("=== Mongoose Demonstration ===");

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

    console.log("1. Schema and Model created successfully");
    console.log("User Schema:", userSchema.obj);

    // Create a sample user instance
    let sampleUser = new User({
      name: "John Doe",
      email: "john@example.com",
      age: 25,
    });

    console.log("2. User instance created:");
    console.log("User data:", sampleUser.toObject());

    console.log("3. Validation example:");
    let invalidUser = new User({
      name: "Jane",
      // email is missing (required field)
      age: "not a number", // wrong type
    });

    try {
      await invalidUser.validate();
    } catch (error) {
      console.log("Validation errors:", error.errors);
    }

    console.log("=== Demonstration Complete ===");
    console.log("To use with real MongoDB:");
    console.log("1. Whitelist your IP in MongoDB Atlas");
    console.log("2. Run: node index.js");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Run the demonstration
demonstrateMongoose();
