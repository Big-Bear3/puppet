# puppet
一款轻量级vue状态管理库，基于vue3响应式系统实现。
## 如何创建一个Store？
本框架是基于类来实现的Store，你可以在项目中的任何地方创建一个类，作为你的Store，至于你想让这个Store是单例的还是多例的（一般是单例的），由你自己来决定。
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
