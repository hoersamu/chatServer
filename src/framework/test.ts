import 'reflect-metadata';
import { Injectable } from './decorators/injectable.decorator';
import { Module } from './decorators/module.decorator';
import { Factory } from './factory';

@Injectable()
class Foo {
	constructor() {
		console.log('foo');
	}
}

@Injectable()
class Fooo {
	constructor() {
		console.log('foo');
	}
}

@Injectable()
class Foofoo {
	constructor(private foo: Foo) {
		console.log('foofoo');
	}
}

@Module({ providers: [Foo, Foofoo], exports: [Foo, Fooo] })
class Bar {}

@Module({
	imports: [Bar],
})
class Foobar {}

Factory.create(Foobar);
