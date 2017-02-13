class NavigationRequest {
    queryString: Map<string, string>;
    routeData: Routes.RouteData;

    /**
     *  Contains the portion of the url after the host/port and before the query string.
     */
    constructor(public path: string) {}
}