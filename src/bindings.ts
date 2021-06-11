import { bindAsyncFactory, bindFactory, bindValue, IBinding } from 'tpendency';

import fac from 'src/utils/fac';
import { delay, pickRandom } from 'src/utils';
import * as Tokens from 'src/tokens';

const bindings: IBinding<unknown>[] = [
    bindValue(Tokens.FactorizeInputToken, 5),
    bindFactory(Tokens.FactorizedNumberToken, v => fac(v), [Tokens.FactorizeInputToken]),

    bindFactory(Tokens.WelcomeMessageToken, () => pickRandom([
        'Hi there 👋',
        'Dependency injection rocks 🤘',
        'Welcome to Oradea Tech Hub 👋',
        '42 🤓',
    ]), []),

    bindAsyncFactory(Tokens.SlowLoadingToken, () => delay(2000, 'Slow loading service finished loading!'), []),
];
export default bindings;
