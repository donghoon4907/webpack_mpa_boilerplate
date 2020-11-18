import { Logger } from "../interface/logger";
import { ConsoleLogger } from "../lib/logger";

let logger: Logger;

export class LoggerFactory {
    public static getInstance(): Logger {
        if (!logger) {
            logger = new ConsoleLogger();
        }

        return logger;
    }
}
