

class Config {
}

class Logger {
    constructor(
        public readonly config: Config,
    ) { }
}

class ServiceA {
    constructor(
        public readonly logger: Logger,
        public readonly config: Config,
    ) { }
}

class ServiceB {
    constructor(
        public readonly config: Config,
        public readonly serviceA: ServiceA,
    ) { }
}

class MyApplication {
    constructor(
        public readonly serviceA: ServiceA,
        public readonly serviceB: ServiceB,
    ) {
    }
}

export function createMyApplication() {
    const config = new Config();
    const logger = new Logger(config);
    const serviceA = new ServiceA(logger, config);
    const serviceB = new ServiceB(config, serviceA);
    return new MyApplication(serviceA, serviceB);
}
