
export function delay<T = void>(delay: number, value?: T): Promise<T> {
    return new Promise(r => setTimeout(r, delay, value));
}

export function pickRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

export function wrapPromise<T>(promise: Promise<T>) {
    let status: 'pending' | 'success' | 'error' = "pending";
    let result: any;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        status,
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result as T;
            }
        }
    };
}
