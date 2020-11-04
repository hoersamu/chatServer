import 'reflect-metadata';
import { Injector } from './dependency-injection/injector';
import { Type } from './util';

export const Factory = new (class {
	private moduleCache: { [key: string]: Array<Type<any>> } = {};

	create(module: Type<any>) {
		if (Reflect.getMetadata('type', module) != 'module') console.log('Error');
		else {
			try {
				return Factory.buildModule(module);
			} catch (error) {
				console.warn(error);
			}
		}
	}

	private buildModule(target: Type<any>): Array<Type<any>> | void {
		let importTokens = Reflect.getMetadata('imports', target),
			imports;
		if (importTokens)
			imports = importTokens.map((token) => {
				if (this.moduleCache[token.name] === null) return this.moduleCache[token.name];

				return Factory.buildModule(token);
			});

		let providerTokens = Reflect.getMetadata('providers', target);
		let providers = {};
		if (providerTokens) {
			const moduleInjector = new Injector();

			providerTokens.map((token) => {
				providers[token.name] = moduleInjector.resolve(token);
			});
		}

		let exportTokens = Reflect.getMetadata('exports', target),
			expo;
		if (exportTokens)
			expo = exportTokens.map((token) => {
				if (providers[token.name]) return providers[token.name];
				else throw new Error(`Module ${target.name} trying to export unknown provider ${token.name}`);
			});

		this.moduleCache[target.name] = expo;
	}
})();
