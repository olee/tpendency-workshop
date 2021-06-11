import { createToken } from 'tpendency';

export const FactorizeInputToken = createToken<number>('FactorizeInput');
export const FactorizedNumberToken = createToken<number>('FactorizedNumber');

export const WelcomeMessageToken = createToken<string>('WelcomeMessage');

export const SlowLoadingToken = createToken<string>('SlowLoading');
