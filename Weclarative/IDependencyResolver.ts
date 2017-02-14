interface IDependencyResolver {
    getService(type: string, parameters?: Map<string, any>): any;
}