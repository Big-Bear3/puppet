import { reactive, toRaw } from 'vue';

const stateHolderToStates = new WeakMap<any, { states: { [key: string | symbol]: any } }>();

export function handleState(target: any, key: string | symbol): void {
    Reflect.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            const states = getStates(this);
            if (states) return states[key];
            return undefined;
        },
        set(newState: any) {
            if (typeof newState === 'function') {
                console.error('state不能是函数类型！\n', newState, `\nstate：${<string>key}`, `\nstate持有者：`, this);
                return;
            }
            if (newState instanceof WeakMap || newState instanceof WeakSet) {
                console.error('state不能是弱引用类型！\n', newState, `\nstate：${<string>key}`, `\nstate持有者：`, this);
                return;
            }

            const states = getStates(this);
            const currentState = states[key];

            if (Reflect.has(states, key)) {
                const result = verifyNewStateType(currentState, newState, target, key);
                if (!result) return;
            }

            if (typeof currentState === 'object' && currentState !== null) {
                if (Array.isArray(currentState)) {
                    currentState.splice(0, currentState.length, ...newState);
                } else if (currentState instanceof Map) {
                    currentState.clear();
                    for (const [newStateKey, newStateValue] of newState) {
                        currentState.set(newStateKey, newStateValue);
                    }
                } else if (currentState instanceof Set) {
                    currentState.clear();
                    for (const newStateItem of newState) {
                        currentState.add(newStateItem);
                    }
                } else {
                    try {
                        for (const currentStateKey of Object.keys(currentState)) {
                            delete currentState[currentStateKey];
                        }
                        Object.assign(currentState, newState);
                    } catch (error) {
                        console.error('放入新的state出错！', error);
                    }
                }
            } else {
                states[key] = newState;
            }
        }
    });
}

function getStates(stateHolder: any): any {
    let statesWrapper = stateHolderToStates.get(stateHolder);
    if (!statesWrapper) {
        statesWrapper = reactive({ states: {} });
        stateHolderToStates.set(stateHolder, statesWrapper);
    }
    return statesWrapper.states;
}

function verifyNewStateType(currentState: any, newState: any, stateHolder: any, key: string | symbol): boolean {
    const currentStateType = typeof currentState;
    const newStateType = typeof newState;

    if (currentStateType === 'object' && currentState !== null && (newStateType !== 'object' || newState === null)) {
        showTypeError('对象', '基本', currentState, newState, stateHolder, key);
        return false;
    }

    if ((currentStateType !== 'object' || currentState === null) && newStateType === 'object' && newState !== null) {
        showTypeError('基本', '对象', currentState, newState, stateHolder, key);
        return false;
    }

    if (currentStateType === 'object' && currentStateType !== null) {
        if (Array.isArray(currentState) && !Array.isArray(newState)) {
            showTypeError('数组', '对象', currentState, newState, stateHolder, key);
            return false;
        }

        if (!Array.isArray(currentState) && Array.isArray(newState)) {
            showTypeError('对象', '数组', currentState, newState, stateHolder, key);
            return false;
        }

        if (currentState instanceof Map && !(newState instanceof Map)) {
            showTypeError('Map', '非Map', currentState, newState, stateHolder, key);
            return false;
        }

        if (!(currentState instanceof Map) && newState instanceof Map) {
            showTypeError('非Map', 'Map', currentState, newState, stateHolder, key);
            return false;
        }

        if (currentState instanceof Set && !(newState instanceof Set)) {
            showTypeError('Set', '非Set', currentState, newState, stateHolder, key);
            return false;
        }

        if (!(currentState instanceof Set) && newState instanceof Set) {
            showTypeError('非Set', 'Set', currentState, newState, stateHolder, key);
            return false;
        }
    }

    return true;
}

function showTypeError(
    currentTypeText: string,
    newTypeText: string,
    currentState: any,
    newState: any,
    stateHolder: any,
    key: string | symbol
): void {
    console.error(
        `为state设置的新值与当前值类型不一致！\n当前值为${currentTypeText}类型：`,
        toRaw(currentState),
        `\n新值为${newTypeText}类型：`,
        newState,
        `\nstate：${<string>key}`,
        `\nstate持有者：`,
        stateHolder
    );
}
