import main from "./main";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import path from "path";

// Handle Uncaught Exception
process.on("uncaughtException", (err: Error) => {
    if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Error: ${err.message}`);
        console.log("Shutting down the server due to Unhandled Promise Exception");
    } else {
        console.log(`Error: ${err.message}\n\nStack: ${err.stack}`);
    }

    process.exit(1);
})

// Setting up config file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") })

// Connecting to database
connectDatabase();

const server = main.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handle Unhandled Promise Exceptions
process.on("unhandledRejection", (err: unknown) => {
    // Type guard to check if err is an Error
    if (err instanceof Error) {
        if (process.env.NODE_ENV === "PRODUCTION") {
            console.log(`Error: ${err.message}`);
            console.log("Shutting down the server due to Unhandled Promise Exception");
        } else {
            console.log(`Error: ${err.message}\n\nStack: ${err.stack}`);
        }
    } else {
        console.log("An unhandled rejection occurred, but it was not an Error instance");
    }
    server.close(() => process.exit(1));
});


// Handle MongoParseError Exception
process.on("uncaughtException", (err: Error) => {
    if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Error: ${err.message}`);
        console.log("Shutting down the server due to Uncaught Exception");
    } else {
        console.log(`Error: ${err.message}\n\nStack: ${err.stack}`);
    }
    server.close(() => process.exit(1));
});