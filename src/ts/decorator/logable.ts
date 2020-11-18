import { LoggerFactory } from "../factory/logger";

const logger = LoggerFactory.getInstance();

export function logable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        logger.log(`Calling ${propertyKey}`);

        return originMethod.apply(this, args);
    };
}
