import 'reflect-metadata';
import { Injectable } from './decorators/injectable.decorator';
import { Injector } from './injector';

@Injectable()
class Foo {
	num: number;

	constructor() {
		this.num = Math.random();
	}

	doFooStuff() {
		console.log(this.num);
	}
}

@Injectable()
class Bar {
	constructor(public foo: Foo) {}

	doBarStuff() {
		console.log('bar');
	}
}

@Injectable()
class Foobar {
	constructor(public foo: Foo, public bar: Bar) {}
}

const foobar = Injector.resolve<Foobar>(Foobar);
foobar.bar.doBarStuff();
foobar.foo.doFooStuff();
foobar.bar.foo.doFooStuff();
foobar.foo.doFooStuff();
