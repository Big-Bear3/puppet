import { PuppetShadow } from './../puppet/puppet';
import { Freezer, State, Shadow } from '@/puppet/puppet';

export interface ComponentData {
    componentName: string;
    children: ComponentData[];
    parent: ComponentData;
}

export interface PageData {
    pageCode: number;
    pageName: string;
    components: ComponentData[];
}

const testComponentData1: ComponentData = {
    componentName: '1号组件',
    children: [
        {
            componentName: '1号子组件1',
            children: null,
            parent: undefined
        },
        {
            componentName: '1号子组件2',
            children: null,
            parent: undefined
        }
    ],
    parent: null
};

testComponentData1.children[0].parent = testComponentData1;
testComponentData1.children[1].parent = testComponentData1;

const testComponentData2: ComponentData = {
    componentName: '2号组件',
    children: [
        {
            componentName: '2号子组件',
            children: null,
            parent: undefined
        }
    ],
    parent: null
};

testComponentData2.children[0].parent = testComponentData2;

const testPageData: PageData = {
    pageCode: 1001,
    pageName: '1号页面',
    components: [testComponentData1, testComponentData2]
};

export class PageStore {
    @State()
    private pageData: PageData;

    @Freezer()
    get readonlyPageData(): PageData {
        return this.pageData;
    }

    @Shadow('pageData')
    pageDataShadow: PuppetShadow<PageData>;

    get componentsData(): ComponentData[] {
        return this.pageData.components;
    }

    set componentsData(targetcomponentsData: ComponentData[]) {
        this.pageData.components = targetcomponentsData;
    }

    setComponentsData(targetcomponentsData: ComponentData[]) {
        this.pageData.components = targetcomponentsData;
    }

    // @Shadow((testStore: TestStore) => testStore.fruitObj, 'apple')
    // fruitShadow: any;

    // @State()
    // private _fruit: any = 'apple';

    // @State()
    // private _animals = new Map();

    // @Freezer()
    // get animals(): any {
    //     return this._animals;
    // }

    // get fruit(): string {
    //     return this._fruit;
    // }

    constructor() {
        this.pageData = testPageData;
    }
}
