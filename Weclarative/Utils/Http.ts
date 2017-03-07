namespace Weclarative.Utils {
    export class Http {
        private _url: string;
        private queryString = new Map<string, any>();

        private constructor(url: string) {
            // If the url already contains a query string, we want to decompose it into our query string
            // dictionary so we can seamlessly add on other query string arguments if necessary.
            var queryIndex = url.indexOf("?");
            if (queryIndex != -1) {
                var baseUrl = url.substring(0, queryIndex);
                var queryString = url.substring(queryIndex + 1);
                for (const pair of queryString.split("&"))
                {
                    var parts = pair.split("=");
                    this.withQueryString(parts[0], decodeURI(parts[1]));
                }
                url = baseUrl;
            }

            this.url = url;
        }

        get url() {
            let url = this._url;

            // Build query string
            if (this.queryString.size > 0) {
                url += "?";
                url += Http.convertDictionaryToQueryString(this.queryString);
            }

            return url;
        }

        static to(url: string) {
            return new Http(url);
        }

        withQueryString(key: string, value: string): this {
            this.queryString.set(key, value);
            return this;
        }

        get() {
            return new HttpResponseContext(new HttpRequestContext(this, "GET"), "application/json", null);
        }
    }
}