import { Freezer, State } from '@/puppet/puppet';

class A {
    aa: string;

    constructor(d: string) {
        this.aa = d;
    }

    bb(): void {
        console.log(1111);
    }
}

class B {
    ccc: string;

    constructor(d: string) {
        this.ccc = d;
    }

    bbb(): void {
        console.log(1111);
    }
}

class C extends B {
    xxx: string;

    constructor(d: string) {
        super('123');
        this.xxx = d;
    }

    bbb(): void {
        console.log(1111);
    }
}

export class TestStore {
    @State()
    private _fruit: any = 'apple';

    @State()
    private _animals = new Map();

    @Freezer()
    get animals(): any {
        return this._animals;
    }

    get fruit(): string {
        return this._fruit;
    }

    constructor() {
        setTimeout(() => {
            this._fruit = 'pear';
        }, 500);
        setTimeout(() => {
            const map = new Map();
            map.set('aaa', {
                redAnimals: {
                    monkey: 'Monkey11',
                    fish: {
                        carp: 'Carp11'
                    }
                },
                yellowAnimals: ['Lion', { camel: 'Camel' }]
            });
            this._animals = map;
        });
    }
}
