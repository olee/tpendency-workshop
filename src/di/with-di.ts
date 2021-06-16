import { bind, createToken, Injector } from "tpendency";

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

export async function createMyApplication() {
    return await injector.get(MyApplicationToken);
}

const ConfigToken = createToken<Config>();
const LoggerToken = createToken<Logger>();
const ServiceAToken = createToken<ServiceA>();
const ServiceBToken = createToken<ServiceB>();
const MyApplicationToken = createToken<MyApplication>();

const injector = new Injector([
    bind(ConfigToken).toClass(Config),
    bind(LoggerToken).toClass(Logger, [ConfigToken]),
    bind(ServiceAToken).toClass(ServiceA, [LoggerToken, ConfigToken]),
    bind(ServiceBToken).toClass(ServiceB, [ConfigToken, ServiceAToken]),
    bind(MyApplicationToken).toClass(MyApplication, [ServiceAToken, ServiceBToken]),
]);
