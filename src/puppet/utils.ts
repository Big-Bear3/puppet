export function isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
}

export function coverObject(currentObj: any, newObj: any): void {
    if (Array.isArray(currentObj)) {
        currentObj.splice(0, currentObj.length, ...newObj);
    } else if (currentObj instanceof Map) {
        currentObj.clear();
        for (const [newStateKey, newStateValue] of newObj) {
            currentObj.set(newStateKey, newStateValue);
        }
    } else if (currentObj instanceof Set) {
        currentObj.clear();
        for (const newStateItem of newObj) {
            currentObj.add(newStateItem);
        }
    } else {
        try {
            for (const currentStateKey of Object.keys(currentObj)) {
                delete currentObj[currentStateKey];
            }
            Object.assign(currentObj, newObj);
        } catch (error) {
            console.error('覆盖对象发生错误！', error);
        }
    }
}
