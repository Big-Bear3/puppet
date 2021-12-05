import { PuppetShadow } from './../puppet/puppet';
import { Freezer, State, Shadow } from '@/puppet/puppet';

interface DateOfBirth {
    year: number;
    month: number;
    day: number;
}

export class ExampleStore {
    @State()
    private nameState = 'Zhangsan';

    @State()
    private dateOfBirthState = {
        year: 1999,
        month: 1,
        day: 10
    };

    set name(newName: string) {
        this.nameState = newName;
    }

    get name(): string {
        return this.nameState;
    }

    get changeableDateOfBirth(): DateOfBirth {
        return this.dateOfBirthState;
    }

    @Freezer()
    get dateOfBirth(): DateOfBirth {
        return this.dateOfBirthState;
    }

    @Shadow('dateOfBirthState')
    dateOfBirthShadow: PuppetShadow<DateOfBirth>;

    @Shadow((store: ExampleStore) => store.dateOfBirthState, 'month')
    monthOfBirthShadow: PuppetShadow<number>;

    setName(newName: string): void {
        this.nameState = newName;
    }

    setDateOfBirth(newDateOfBirth: DateOfBirth): void {
        this.dateOfBirthState = newDateOfBirth;
    }

    setYearOfBirth(newYear: number): void {
        this.dateOfBirthState.year = newYear;
    }
}
