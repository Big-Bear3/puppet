import { PuppetShadow } from './puppet';
import { reactive, ref, isRef } from 'vue';

import { cloneDeep, isObject } from 'lodash';
import { coverObject } from './utils';

export function handleShadow(
    target: any,
    key: string | symbol,
    partialStateOrShadowKey: string | symbol | ((stateHolder: any) => any),
    shadowKeyOrEmpty?: string | symbol
): void {
    Reflect.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get(): PuppetShadow {
            const a = typeof partialStateOrShadowKey;
            let partialState: any;
            let shadowKey: string | symbol;
            if (typeof partialStateOrShadowKey === 'function') {
                partialState = partialStateOrShadowKey.call(this, this);
                shadowKey = shadowKeyOrEmpty;
            } else {
                partialState = this;
                shadowKey = partialStateOrShadowKey;
            }

            if (typeof partialState[shadowKey] === 'function') {
                console.error(
                    'shadow不能是函数类型！\n',
                    partialState[shadowKey],
                    `\nshadow：${<string>key}`,
                    `\nshadow持有者：`,
                    this
                );
                return;
            }

            let originalShadowObject: any;
            let shadowObject: any;
            if (isObject(partialState[shadowKey])) {
                originalShadowObject = cloneDeep(partialState[shadowKey]);
                shadowObject = reactive(cloneDeep(originalShadowObject));
            } else {
                originalShadowObject = partialState[shadowKey];
                shadowObject = ref(originalShadowObject);
            }

            const commitFn = () => {
                if (isRef(shadowObject)) {
                    partialState[shadowKey] = shadowObject.value;
                    originalShadowObject = shadowObject.value;
                } else {
                    partialState[shadowKey] = cloneDeep(shadowObject);
                    originalShadowObject = cloneDeep(shadowObject);
                }
            };

            const resetFn = (): void => {
                if (isRef(shadowObject)) {
                    shadowObject.value = originalShadowObject;
                } else {
                    coverObject(shadowObject, originalShadowObject);
                }
            };

            return [shadowObject, commitFn, resetFn];
        },
        set(value: any): void {
            console.error('禁止对shadow对象赋值！\nvalue：', value, `\nshadow：${<string>key}`, `\nshadow持有者：`, this);
        }
    });
}
