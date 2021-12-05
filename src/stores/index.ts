import { ExampleStore } from './exampleStore';
import { BasicTypeStateStore } from './basicTypeStateStore';
import { AnimalStore } from './animalStore';
import { ComponentStore } from './componentStore';
import { PageStore } from './pageStore';

export const exampleStore = new ExampleStore();
export const animalStore = new AnimalStore();
export const pageStore = new PageStore();
export const componentStore = new ComponentStore(null);
export const basicTypeStateStore = new BasicTypeStateStore();
