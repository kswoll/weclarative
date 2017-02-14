class NavigationRequest {
    /**
     *  Contains the portion of the url after the host/port and before the query string.
     */
    constructor(public path: string, public queryString: Map<string, string>, public routeData: Routes.RouteData) {}
}