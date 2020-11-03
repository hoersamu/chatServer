import { GenericClassDecorator, Type } from '../util';

/**
 * @param singleton Currently unused
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Injectable = (singleton: boolean = true): GenericClassDecorator<Type<any>> => {
	return (target: Type<any>) => {
		Reflect.defineMetadata('singleton', singleton, target);
		return target;
	};
};
