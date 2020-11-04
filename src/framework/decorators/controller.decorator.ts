import { GenericClassDecorator, Type } from '../util';

/**
 * @param singleton
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Controller = (): GenericClassDecorator<Type<any>> => {
	return (target: Type<any>) => {
		Reflect.defineMetadata('type', 'controller', target);
		return target;
	};
};
