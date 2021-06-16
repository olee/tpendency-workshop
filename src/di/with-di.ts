import { bind, createToken, Injector } from "tpendency";

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

const ConfigToken = createToken<Config>();
const LoggerToken = createToken<Logger>();
const ServiceAToken = createToken<ServiceA>();
const ServiceBToken = createToken<ServiceB>();

export default class MyApplication {
    injector = new Injector([
        bind(ConfigToken).toClass(Config),
        bind(LoggerToken).toClass(Logger, [ConfigToken]),
        bind(ServiceAToken).toClass(ServiceA, [LoggerToken, ConfigToken]),
        bind(ServiceBToken).toClass(ServiceB, [ConfigToken, ServiceAToken]),
    ]);
    constructor() {
        this.injector.get(ServiceBToken);
    }
}
