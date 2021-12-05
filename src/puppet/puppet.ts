import { Ref } from 'vue';
import { handleFreezer } from './freezer';
import { handleShadow } from './shadow';
import { handleState } from './state';

export type PuppetShadowCommitFn = () => void;
export type PuppetShadowResetFn = () => void;

type BasicTypeToRef<T> = T extends Record<string | symbol, any> ? (T extends null | undefined ? Ref<T> : T) : Ref<T>;
export type PuppetShadow<T = any> = [shadowObject: BasicTypeToRef<T>, commitFn: PuppetShadowCommitFn, resetFn: PuppetShadowResetFn];

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
export function Shadow<R extends Record<string | symbol, any>>(
    partialState: (stateHolder: any) => R,
    shadowKey: R extends any[] ? number : keyof R
): PropertyDecorator;
export function Shadow(
    partialStateOrShadowKey: string | symbol | ((stateHolder: any) => any),
    shadowKeyOrEmpty?: string | symbol | number
): PropertyDecorator {
    return function (target: any, key: string | symbol) {
        handleShadow(target, key, partialStateOrShadowKey, shadowKeyOrEmpty);
    };
}
