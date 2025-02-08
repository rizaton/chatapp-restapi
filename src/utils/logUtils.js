import fs from "fs";

export const writeLogToFile = (message) => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync("logs.txt", logMessage);
};
