/// <reference path="Fixups/WindowFixups.ts" />

class DefaultDependencyResolver implements IDependencyResolver {
    getService(type: string, parameters?: Map<string, any>): any {
        return Object.create((window[type] as Function).prototype);
    }
}