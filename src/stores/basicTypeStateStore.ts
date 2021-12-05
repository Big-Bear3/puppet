import { PuppetShadow, State } from './../puppet/puppet';
import { Shadow } from '@/puppet/puppet';

export class BasicTypeStateStore {
    @State()
    private projectId = 123;

    @State()
    private projectName: string;

    @Shadow('projectName')
    projectNameShadow: PuppetShadow<string>;

    get readonlyProjectId(): number {
        return this.projectId;
    }

    get readonlyProjectName(): string {
        return this.projectName;
    }

    constructor() {
        this.projectName = 'My Project!!!';

        setTimeout(() => {
            this.projectId = 456;
        }, 1000);
    }

    increaseProjectId(): void {
        this.projectId++;
    }
}
