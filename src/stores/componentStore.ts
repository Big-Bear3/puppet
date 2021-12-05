import { pageStore } from './index';
import { PuppetShadow } from './../puppet/puppet';
import { ComponentData, PageStore } from './pageStore';
import { Freezer, Shadow } from '@/puppet/puppet';

export class ComponentStore {
    @Freezer()
    get readonlyComponentsData(): ComponentData[] {
        return this.parentPageStore.componentsData;
    }

    get componentsData(): ComponentData[] {
        return this.parentPageStore.componentsData;
    }

    set componentsData(targetcomponentsData: ComponentData[]) {
        this.parentPageStore.componentsData = targetcomponentsData;
        //this.parentPageStore.setComponentsData(targetcomponentsData);
    }

    @Shadow('componentsData')
    componentsDataShadow: PuppetShadow<ComponentData[]>;

    @Shadow((componentStore: ComponentStore) => componentStore.componentsData, 0)
    firstComponentsDataShadow: PuppetShadow<ComponentData>;

    constructor(private parentPageStore: PageStore) {
        this.parentPageStore = pageStore;
    }
}
