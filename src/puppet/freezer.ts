import { readonly } from 'vue';

export function handleFreezer(descriptor: PropertyDescriptor): void {
    let hostType: 'method' | 'accessor';
    if (descriptor.value) {
        hostType = 'method';
    } else if (descriptor.get) {
        hostType = 'accessor';
    } else {
        console.error('Freezer()装饰器只能装饰方法和get访问器！');
        return;
    }

    let originFn: (...args: any[]) => any;
    if (hostType === 'method') {
        originFn = descriptor.value;
        descriptor.value = function (...args: any[]) {
            return handleFreezerFn(originFn, args, this);
        };
    } else if (hostType === 'accessor') {
        originFn = descriptor.get;
        descriptor.get = function (...args: any[]) {
            return handleFreezerFn(originFn, args, this);
        };
    }
}

function handleFreezerFn(originFn: (...args: any[]) => any, originFnArgs: any[], stateHolder: any): any {
    const state = originFn.call(stateHolder, ...originFnArgs);
    if (typeof state === 'object' && state !== null) {
        return readonly(state);
    }
    return state;
}
