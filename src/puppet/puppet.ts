import { handleFreezer } from './freezer';
import { handleShadow } from './shadow';
import { handleState } from './state';

export type PuppetShadowCommitFn = () => void;
export type PuppetShadowResetFn = () => void;
export type PuppetShadow<T = any> = [shadowObject: T, commitFn: PuppetShadowCommitFn, resetFn: PuppetShadowResetFn];

export function State(): PropertyDecorator {
    return function (target: any, key: string | symbol) {
        handleState(target, key);
    };
}

export function Freezer(): MethodDecorator {
    return function (_target: any, _key: string | symbol, descriptor: PropertyDescriptor) {
        handleFreezer(descriptor);
    };
}

export function Shadow(shadowKey: string | symbol): PropertyDecorator;
export function Shadow<R>(
    partialState: (stateHolder: any) => R,
    shadowKey: R extends any[] ? number : string | symbol
): PropertyDecorator;
export function Shadow(
    partialStateOrShadowKey: string | symbol | ((stateHolder: any) => any),
    shadowKeyOrEmpty?: string | symbol | number
): PropertyDecorator {
    return function (target: any, key: string | symbol) {
        handleShadow(target, key, partialStateOrShadowKey, shadowKeyOrEmpty);
    };
}
