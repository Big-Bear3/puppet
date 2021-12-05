import { BasicTypeStateStore } from './basicTypeStateStore';
import { AnimalStore } from './animalStore';
import { ComponentStore } from './componentStore';
import { PageStore } from './pageStore';
import { TestStore } from './testStore';

export const testStore = new TestStore();
export const animalStore = new AnimalStore();
export const pageStore = new PageStore();
export const componentStore = new ComponentStore(null);
export const basicTypeStateStore = new BasicTypeStateStore();
