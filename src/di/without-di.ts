

class Config {
    public readonly logPrefix: string = 'Prefix: ';
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

export default class MyApplication {
    config: Config;
    logger: Logger;
    serviceA: ServiceA;
    serviceB: ServiceB;
    constructor() {
        this.config = new Config();
        this.logger = new Logger(this.config);
        this.serviceA = new ServiceA(this.logger, this.config);
        this.serviceB = new ServiceB(this.config, this.serviceA);
    }
}
