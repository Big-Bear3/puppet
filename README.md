# Puppet
一款轻量级的 **Vue3** 状态管理库，基于 **Typescript** + **Vue3** 响应式系统实现。
## 如何创建一个Store？
Puppet是基于**类**来实现的Store，你可以在项目中的任何地方创建一个类，作为你的Store，至于你想让这个Store是单例的还是多例的（一般是单例的），由你自己来决定。
## 如何创建一个State？
你可以通过 **@State()** 装饰器来定义你的State，被装饰的对象为Store中的成员变量，你可以通过@State()装饰器在一个Store中定义多个State。当然，我们推荐您通过private访问修饰符将State设为私有的，再定义其get访问器，让外界通过get访问器访问你的State。

```
export class ExampleStore {
    @State()
    private nameState = 'Zhangsan';

    @State()
    private dateOfBirthState = {
        year: 1999,
        month: 1,
        day: 10
    };

    get name(): string {
        return this.nameState;
    }

    get dateOfBirth(): DateOfBirth {
        return this.dateOfBirthState;
    }
}
```
通过这种方式得到的State是双向数据流的，你可以使用Puppet中的 **@Freezer()** 装饰器，得到一个**单向数据流**的State！
```
@Freezer()
get dateOfBirth(): DateOfBirth {
    return this.dateOfBirthState;
}
```
对于基本类型的State，因为没有set访问器，本身就是单向的。
## 如何使用State？
如果你的项目没有依赖注入工具的话，推荐你建一个或多个ts文件，来保存你的state实例。
```
export const exampleStore = new ExampleStore();
export const exampleStore2 = new ExampleStore2();
export const exampleStore3 = new ExampleStore3();
```
在vue文件中，如果你的State是对象类型，如上面ExampleStore中的dateOfBirth，Puppet允许你对第一层解构来使用，而不失响应性。当然你不可以将这个State再设置为其他类型。如：原State是对象类型，将其设置为基本类型、原对象是非数组对象，将其设置为数组类型。
```
<template>
    <ul>
        <li>Date Of Birth</li>
        <li>Year: {{ dateOfBirth.year }}</li>
        <li>Month: {{ dateOfBirth.month }}</li>
        <li>Day: {{ dateOfBirth.day }}</li>
    </ul>
</template>

<script lang="ts" setup>
import { exampleStore } from '@/stores';
const { dateOfBirth } = exampleStore;
</script>
```

如果你的state是基本类型，如上面ExampleStore中的name，则不可以结构，你需要通过exampleStore.name来使用，否则会失去响应性。
```
<div>Name：{{ exampleStore.name }}</div>
```
## 如何更改State？
在Puppet中没有像Vuex中mutation、action的概念，你可以在Store中定义普通的方法来改变该Store中的State。
```
setName(newName: string): void {
    this.nameState = newName;
}

setDateOfBirth(newDateOfBirth: DateOfBirth): void {
    this.dateOfBirthState = newDateOfBirth;
}

setYearOfBirth(newYear: number): void {
    this.dateOfBirthState.year = newYear;
}
```
## 如何双向绑定State？
如果你需要的场景是输入的值一改变，立即更新State，则建议：
基本类型的State：提供set访问器，直接在vue文件中双向绑定。
对象类型的State：提供没有被@Freezer()装饰器装饰的get访问器，双向绑定get访问器返回的State。
```
<ul>
    <li>Name: <input v-model="exampleStore.name" /></li>
    <li>Date Of Birth</li>
    <li>年：<input v-model="changeableDateOfBirth.year" /></li>
    <li>月：<input v-model="changeableDateOfBirth.month" /></li>
    <li>日：<input v-model="changeableDateOfBirth.day" /></li>
</ul>
```
如果你需要的场景是输入后，在某一动作后，再更新State，如提交表单，则建议使用Puppet提供的 **@Shadow()** 装饰器。该装饰器有两个重载：
```
export function Shadow(shadowKey: string | symbol): PropertyDecorator;
export function Shadow<R extends Record<string | symbol, any>>(
    partialState: (stateHolder: any) => R,
    shadowKey: R extends any[] ? number : keyof R
): PropertyDecorator;
```
第一个重载的参数为，当前Store中你需要的State的key。
第二个重载的参数为，partialState：当前Store中你需要的State中的对象的父对象； shadowKey：当前Store中你需要的State中的对象的key。
使用方式如下：
```
@Shadow('name')
nameShadow: PuppetShadow<string>;

@Shadow((store: ExampleStore) => store.dateOfBirthState, 'month')
monthOfBirthStateShadow: PuppetShadow<number>;
```
返回的 **PuppetShadow** 类型的对象是一个元组，第一个元素为，你需要的State或State的一部分的对象副本，并且是响应式的，如果这个副本是基本类型，则Puppet会通过Vue3的ref函数去创建并包装这个副本。
第二个元素为提交这个副本的函数，调用此函数后，Puppet会将你更改后的副本覆盖到你的State中去。第三个元素为重置这个副本的函数，调用此函数后，将当前的副本重置到初始值或上一次提交的值。







