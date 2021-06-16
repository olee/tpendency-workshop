import { bind, Injector } from 'tpendency';

import bindings from 'src/bindings';
import * as Tokens from 'src/tokens';

import { IApiService } from './ApiService';

class MockApiService implements IApiService {
    public async getRandomCat() {
        return {
            id: '595f280e557291a9750ebfab',
            created_at: '2016-11-21T02:58:48.432Z',
            tags: [],
            url: '/cat/595f280e557291a9750ebfab',
        };
    }
}

test('ApiService', async () => {
    const injector = new Injector(bindings);

    const apiService = await injector.get(Tokens.ApiServiceToken);

    const result = await apiService.getRandomCat();

    expect(result).toBeDefined();
    expect(typeof result.url).toBe("string");
});

test('Mocked ApiService', async () => {
    const injector = new Injector([
        ...bindings,
        bind(Tokens.ApiServiceToken).toClass(MockApiService),
    ]);

    const apiService = await injector.get(Tokens.ApiServiceToken);

    const result = await apiService.getRandomCat();

    expect(result).toMatchObject({
        id: '595f280e557291a9750ebfab',
        created_at: '2016-11-21T02:58:48.432Z',
        tags: [],
        url: '/cat/595f280e557291a9750ebfab',
    });
});
