import { PuppetShadow, State } from './../puppet/puppet';
import { Freezer, Shadow } from '@/puppet/puppet';

export class BasicTypeStateStore {
    @State()
    private projectId = 123;

    @State()
    private projectName: string;

    @Shadow('projectName')
    projectNameShadow: PuppetShadow<string>;

    @Freezer()
    get readonlyProjectId(): number {
        return this.projectId;
    }

    @Freezer()
    get readonlyProjectName(): string {
        return this.projectName;
    }

    constructor() {
        this.projectName = 'My Project!!!';
    }

    increaseProjectId(): void {
        this.projectId++;
    }
}
