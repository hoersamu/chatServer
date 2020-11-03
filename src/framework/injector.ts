import 'reflect-metadata';
import { Type } from './util';

/**
 * The Injectore stores services and resolves requested instances.
 */
export const Injector = new (class {
	cache: { [key: string]: object } = {};

	/**
	 * Resolvves instances by injecting required services
	 * @param {Type<any>} target
	 * @returns {T}
	 */
	resolve<T>(target: Type<any>): T {
		//tokens are required dependencies, while injections are resolves tokens from the Injector
		let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
			injections = tokens.map((token) => {
				if (this.cache[token.name]) return this.cache[token.name];
				return Injector.resolve<any>(token);
			});

		// Creates the class with all dependencies
		const finishedTarget = new target(...injections);

		//Saves the finished class
		if (Reflect.getMetadata('singleton', target)) {
			this.cache[target.name] = finishedTarget;
		}

		return finishedTarget;
	}
})();
