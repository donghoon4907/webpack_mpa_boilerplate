import { Logger } from "../interfaces/logger";
import { ConsoleLogger } from "../libs/logger";

let logger: Logger;

export class LoggerFactory {
    public static getInstance(): Logger {
        if (!logger) {
            logger = new ConsoleLogger();
        }

        return logger;
    }
}
