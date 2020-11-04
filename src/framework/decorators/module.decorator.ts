import { GenericClassDecorator, Type } from '../util';

export interface ModuleMetadata {
	/**
	 * Optional list of imported modules that export the providers which are
	 * required in this module.
	 */
	imports?: Array<Type<any>>;
	/**
	 * Optional list of controllers defined in this module which have to be
	 * instantiated.
	 */
	controllers?: Array<Type<any>>;
	/**
	 * Optional list of providers that will be instantiated by the Nest injector
	 * and that may be shared at least across this module.
	 */
	providers?: Array<Type<any>>;
	/**
	 * Optional list of the subset of providers that are provided by this module
	 * and should be available in other modules which import this module.
	 */
	exports?: Array<Type<any>>;
}

const setMetadata = (target: any, metadata: ModuleMetadata) => {
	Reflect.defineMetadata('type', 'module', target);
	if (metadata)
		Object.entries(metadata).forEach(([key, value]) => {
			Reflect.defineMetadata(key, value, target);
		});
};

/**
 * @param singleton
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Module = (metadata?: ModuleMetadata): GenericClassDecorator<Type<any>> => {
	return (target: Type<any>) => {
		setMetadata(target, metadata);
		return target;
	};
};
