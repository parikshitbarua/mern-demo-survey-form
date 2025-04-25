import winston from "winston";
import "winston-mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/survey";

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, userId, route, stack }) => {
      const logEntry = {
        timestamp,
        level,
        userId: userId || 'null',
        message,
        route,
        ...(stack ? { error: stack } : {}),
      };
      return JSON.stringify(logEntry);
    })
  );
  
  // Winston logger with MongoDB transport
  const logger = winston.createLogger({
    transports: [
      new winston.transports.MongoDB({
        db: mongoURI,
        level: 'info',
        collection: 'app_logs',
        options: { useUnifiedTopology: true },
        format: logFormat
      })
    ]
  });

  export default logger;