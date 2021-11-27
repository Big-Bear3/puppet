import { handleFreezer } from './freezer';
import { handleShadow } from './shadow';
import { handleState } from './state';

export function State(): PropertyDecorator {
    return function (target: any, key: string | symbol) {
        handleState(target, key);
    };
}

export function Freezer(): MethodDecorator {
    return function (_target: any, _key: string | any, descriptor: PropertyDescriptor) {
        handleFreezer(descriptor);
    };
}

export function Shadow(): MethodDecorator {
    return function (_target: any, _key: string | any, descriptor: PropertyDescriptor) {
        handleShadow(descriptor);
    };
}
