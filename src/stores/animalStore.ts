import { Freezer, State } from '@/puppet/puppet';

export class AnimalParentStore {
    @State()
    protected _shallowAnimals = {
        dog: 'Dog',
        cat: 'Cat',
        pigs: ['Pig1', 'Pig2', 'Pig3']
    };
}

export class AnimalStore extends AnimalParentStore {
    // =======================shallow object============================

    @Freezer()
    get shallowAnimals() {
        return this._shallowAnimals;
    }

    setShallowDog(): void {
        this._shallowAnimals.dog = 'Dog!!!!';
    }

    async removeShallowCat() {
        setTimeout(() => {
            delete this._shallowAnimals.cat;
        });
    }

    pushShallowPig(): void {
        this._shallowAnimals.pigs.push('Pig4');
    }

    removeShallowPig(): void {
        this._shallowAnimals.pigs.splice(this._shallowAnimals.pigs.length - 1);
    }

    // ========================shallow array===========================
    @State()
    private _shallowDucksArray = ['Duck1', 'Duck2', 'Duck3'];

    @Freezer()
    get shallowDucksArray() {
        return this._shallowDucksArray;
    }

    insertDuck(): void {
        this._shallowDucksArray.splice(1, 0, 'Duck!!!!');
    }

    setThirdDuck(): void {
        this._shallowDucksArray[2] = '@Duck';
    }

    // ========================deep object===========================
    @State()
    private _deepAnimals: any = {
        redAnimals: {
            monkey: 'Monkey',
            fish: {
                carp: 'Carp'
            }
        },
        yellowAnimals: ['Lion', { camel: 'Camel' }]
    };

    @Freezer()
    get deepAnimals() {
        return this._deepAnimals;
    }

    setMonkey(): void {
        this._deepAnimals.redAnimals.monkey = 'Monkey####';
    }

    addFish(): void {
        this._deepAnimals.redAnimals.fish.betta = 'Betta';
    }

    setCarp(): void {
        this._deepAnimals.redAnimals.fish.carp = 'Carp。。';
    }

    lionIndex = 0;

    setLion(): void {
        this._deepAnimals.yellowAnimals[0] = 'Lion^^^^' + this.lionIndex;
        this.lionIndex++;
    }

    setCamel(): void {
        this._deepAnimals.yellowAnimals[1].camel = 'Camel++';
    }

    // ========================deep array===========================
    @State()
    private _deepMarineAnimalsArray = [{ dolphin: ['Dolphin1', 'Dolphin2'] }, { dolphin: ['DolphinA', 'DolphinB', 'DolphinC'] }];

    @Freezer()
    get deepMarineAnimalsArray() {
        return this._deepMarineAnimalsArray;
    }

    @Freezer()
    get firstDolphins() {
        return this._deepMarineAnimalsArray[0];
    }

    @Freezer()
    getSecondDolphins() {
        return this._deepMarineAnimalsArray[1].dolphin;
    }

    setFirstDolphin(): void {
        this._deepMarineAnimalsArray[0].dolphin = ['Dolphin3'];
        setTimeout(() => {
            this._deepMarineAnimalsArray[0].dolphin = ['Dolphin4'];
        }, 1000);
        setTimeout(() => {
            this._deepMarineAnimalsArray[0].dolphin.push('Dolphin5');
        }, 2000);
    }

    changeSecondDolphin(index: number): void {
        this._deepMarineAnimalsArray[1].dolphin[index] = 'Dolphin~~~';
    }

    changeSecondDolphins(index1: number, index2: number): void {
        this._deepMarineAnimalsArray[1].dolphin[index1] = 'Dolphin---';
        this._deepMarineAnimalsArray[1].dolphin[index2] = 'Dolphin===';
    }

    changeSecondDolphins2(...index: number[]): void {
        for (const indexItem of index) {
            this._deepMarineAnimalsArray[1].dolphin[indexItem] = '...Dolphin';
        }
    }

    changeSecondDolphinsArray(indexArray: number[]): void {
        for (const indexItem of indexArray) {
            this._deepMarineAnimalsArray[1].dolphin[indexItem] = 'Dolphin[][]';
        }
    }

    // ========================动态数据===========================
    @State()
    private _dynamicDeepAnimals: any = { tiger: { tigerColor: { yellowTiger: 'YellowTiger' } } };

    private dynamicDeepAnimals2 = { tiger: { tigerColor: { whiteTiger: 'WhiteTiger' } } };

    @Freezer()
    get dynamicDeepAnimals() {
        return this._dynamicDeepAnimals;
    }

    toggleTiger(): void {
        setTimeout(() => {
            this._dynamicDeepAnimals = this.dynamicDeepAnimals2;
        });
    }

    @State()
    private _dynamicDeepAnimalsArray: any = [{ rabit: 'Rabit' }, { mouse: 'Mouse' }];

    private dynamicDeepAnimalsArray2: any = [{ cow: 'Cow' }];

    @Freezer()
    get dynamicDeepAnimalsArray() {
        return this._dynamicDeepAnimalsArray;
    }

    toggleDeepAnimalsArray(): void {
        this._dynamicDeepAnimalsArray = this.dynamicDeepAnimalsArray2;
    }

    toggleTiger2(): void {
        this._dynamicDeepAnimalsArray = this.dynamicDeepAnimals2;
    }
}
