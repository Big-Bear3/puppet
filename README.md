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
通过这种方式得到的State是双向数据流的，你可以使用Puppet中的 **@Freezer()** 装饰器，得到一个**单项数据流**的State！
```
@Freezer()
get dateOfBirth(): DateOfBirth {
    return this.dateOfBirthState;
}
```
对于基本类型的State，因为没有set访问器，本身就是单项的。
## 如何使用State？
如果你的项目没有依赖注入工具的话，推荐你建一个或多个ts文件，来保存你的state实例。
```
// stores.ts
export const exampleStore = new ExampleStore();
export const exampleStore2 = new ExampleStore2();
export const exampleStore3 = new ExampleStore3();
```
在vue文件中，如果你的State是对象类型，如上面ExampleStore中的dateOfBirth，Puppet允许你对第一层解构来使用，而不失响应性。当然你不可以将这个State再设置为其他类型。如：原State是对象类型，将其设置为基本类型、原对象是非数组对象，将其设置为数组类型。
```
<template>
    <ul class="puppet-ul">
        <li>Date Of Birth</li>
        <li>Year：{{ dateOfBirth.year }}</li>
        <li>Month：{{ dateOfBirth.month }}</li>
        <li>Day：{{ dateOfBirth.day }}</li>
    </ul>
</template>

<script lang="ts" setup>
import { exampleStore } from '@/stores/stores';
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


