# Simple Mongoose Project

This is a basic Node.js project demonstrating MongoDB connection using Mongoose.

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure MongoDB Atlas:**

   - Go to your MongoDB Atlas dashboard
   - Navigate to Network Access
   - Add your current IP address to the IP whitelist
   - Or add `0.0.0.0/0` to allow access from any IP (not recommended for production)

3. **Run the application:**
   ```bash
   node index.js
   ```

## Project Structure

- `package.json` - Project dependencies and scripts
- `.env` - Environment variables (MongoDB connection string)
- `index.js` - Main application file with Mongoose connection and example usage

## MongoDB Connection String

The connection string is stored in the `.env` file:

```
MONGODB_CONNECTION_STRING="mongodb+srv://collinsolucho:102030@cluster0.qjwof9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

## Usage

The application demonstrates:

- Connecting to MongoDB using Mongoose
- Defining a simple User schema
- Creating and saving a user document
- Querying all users from the database

## Dependencies

- mongoose: MongoDB object modeling for Node.js
- dotenv: Loads environment variables from .env file
