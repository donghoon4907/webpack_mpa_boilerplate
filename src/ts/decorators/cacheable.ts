function hash(args: any[]) {
    return args.join();
}

export function cacheable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originMethod = descriptor.value;

    let cache = new Map<string, any>();

    descriptor.value = function (...args: any[]) {
        const key = hash(args);

        if (cache.has(key)) {
            return cache.get(key);
        } else {
            const result = originMethod.apply(this, args);

            cache.set(key, result);

            return result;
        }
    };
}
