import { Logger } from "../interface/logger";

export class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }
}
