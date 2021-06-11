import Injector, { ClassProvider, createBinding, createToken } from '.';

const NumberToken = createToken<number>('number');
const StringToken = createToken<string>('string');
const ArrayToken = createToken<string[]>('string array');

test('value provider', async () => {
    const injector = new Injector([
        createBinding(NumberToken, { dependencyTokens: [], get: async () => 5 }),
        createBinding(StringToken, { dependencyTokens: [], get: async () => 'test' }),
        createBinding(ArrayToken, { dependencyTokens: [], get: async () => ['test'] }),
    ]);

    const num = await injector.get(NumberToken);
    expect(num).toBe(5);

    const str = await injector.get(StringToken);
    expect(str).toBe('test');

    const arr = await injector.get(ArrayToken);
    expect(arr).toEqual(['test']);
    expect(arr).toBe(await injector.get(ArrayToken));
});

class ClassA { constructor(public readonly str: string) { } }

class ClassB { constructor(public readonly clsA: ClassA) { } }

const ClassAToken = createToken<ClassA>('ClassA');
const ClassBToken = createToken<ClassB>('ClassB');

test('class provider', async () => {
    const injector = new Injector([
        createBinding(StringToken, { dependencyTokens: [], get: async () => 'test' }),
        createBinding(ClassAToken, new ClassProvider(ClassA, [StringToken])),
        createBinding(ClassBToken, new ClassProvider(ClassB, [ClassAToken])),
    ]);

    const clsB = await injector.get(ClassBToken);
    expect(clsB).toBeInstanceOf(ClassB);
    expect(clsB.clsA).toBeInstanceOf(ClassA);
    expect(clsB.clsA).toBe(await injector.get(ClassAToken));
});
