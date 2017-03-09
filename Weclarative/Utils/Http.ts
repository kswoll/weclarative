namespace Weclarative.Utils {
    export class Http {
        private readonly _url: string;
        private readonly queryString = new Map<string, any>();
        private readonly progressEvents = new Array<(evt: ProgressEvent) => void>();
        private readonly onFinish = new Array<() => void>();
        private readonly headers = new Map<string, string>();

        private constructor(url: string) {
            // If the url already contains a query string, we want to decompose it into our query string
            // dictionary so we can seamlessly add on other query string arguments if necessary.
            var queryIndex = url.indexOf("?");
            if (queryIndex != -1) {
                var baseUrl = url.substring(0, queryIndex);
                var queryString = url.substring(queryIndex + 1);
                for (const pair of queryString.split("&")) {
                    var parts = pair.split("=");
                    this.withQueryString(parts[0], decodeURI(parts[1]));
                }
                url = baseUrl;
            }

            this._url = url;
        }

        static convertDictionaryToQueryString<TValue>(dictionary: Map<string, TValue>) {
            let result = "";
            let delimiter = "";

            for (const key in dictionary) {
                const value = dictionary.get(key);
                if (value != null) {
                    result += delimiter;
                    delimiter = "&";

                    if (value instanceof Array) {
                        const array = value as Array<any>;
                        for (let i = 0; i < array.length; i++) {
                            result += encodeURI(key) + "=" + encodeURI(array[i].toString());
                            result += delimiter;
                        }
                    } else {
                        result += encodeURI(key) + "=" + encodeURI(value.toString());
                    }
                }
            }

            return result;
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

        get(contentType = "application/json") {
            return new HttpResponseContext(new HttpRequestContext(this, "GET"), contentType, null);
        }

        post(contentType = "application/json") {
            return new HttpResponseContext(new HttpRequestContext(this, "POST"), contentType, null);
        }

        put(contentType = "application/json") {
            return new HttpResponseContext(new HttpRequestContext(this, "PUT"), contentType, null);
        }

        delete(contentType = "application/json") {
            return new HttpResponseContext(new HttpRequestContext(this, "DELETE"), contentType, null);
        }

        withProgress(onProgress: (evt: ProgressEvent) => void): this {
            this.progressEvents.push(onProgress);
            return this;
        }

        whenFinished(action: () => void): this {
            this.onFinish.push(action);
            return this;
        }

        withHeader(name: string, value: string): this {
            this.headers.set(name, value);
            return this;
        }

        withQueryString(key: string, value: string): this {
            this.queryString.set(key, value);
            return this;
        }

        withQueryStringObject(obj: any): this {
            for (const key in obj) {
                const value = obj[key];
                this.queryString.set(key, value);
            }
            return this;
        }

        withQueryStringDictionary(map: Map<string, any>): this {
            for (const key in map) {
                const value = map.get(key);
                this.queryString.set(key, value);
            }
            return this;
        }

        onFinished() {
            for (const action of this.onFinish) {
                action();
            }
        }

        onProgress(evt: ProgressEvent) {
            for (const progressEvent of this.progressEvents) {
                progressEvent(evt);
            }
        }

        execute(request: HttpRequest) {
            const promise = new Promise<HttpResponse>((resolve, reject) => {
                const xmlHttpRequest = new XMLHttpRequest();
                if (this.progressEvents.length > 0)
                    xmlHttpRequest.upload.onprogress = evt => this.onProgress(evt);
                xmlHttpRequest.open(request.method, this.url);
                xmlHttpRequest.setRequestHeader("Content-Type", request.contentType);

                for (const key in this.headers) {
                    const value = this.headers.get(key) as string;
                    xmlHttpRequest.setRequestHeader(key, value);
                }

                xmlHttpRequest.onerror = () => {
                    reject(new HttpStatusCodeError(HttpStatusCode.ServiceUnavailable, "Service Unavailable", null));
                };
                xmlHttpRequest.onload = () => {
                    const statusCode = xmlHttpRequest.status as HttpStatusCode;
                    if (statusCode == HttpStatusCode.Found || statusCode == HttpStatusCode.NoContent) {
                        resolve(new HttpResponse(statusCode, xmlHttpRequest.response, xmlHttpRequest.responseText));
                    } else {
                        reject(new HttpStatusCodeError(statusCode, xmlHttpRequest.responseText, xmlHttpRequest.response));
                    }
                    this.onFinished();
                };

                xmlHttpRequest.send(request.payload);
            });
            return promise;
        }
    }

    export class HttpRequest {
        constructor(readonly method: string, readonly contentType: string, readonly payload: any) {
        }
    }

    export class HttpResponse {
        constructor(readonly statusCode: HttpStatusCode, readonly response: any, readonly responseText: string) {
        }
    }

    export class HttpRequestContext {
        constructor(readonly http: Http, readonly method: string) {
        }

        json(o: any) {
            const jsonString = JSON.stringify(o);

            return new HttpResponseContext(this, "application/json", jsonString);
        }

        file(file: File) {
            return new HttpResponseContext(this, file.type, file);
        }

        execute(contentType: string, payload: any) {
            const request = new HttpRequest(this.method, contentType, payload);
            return this.http.execute(request);
        }

        async go() {
            await this.execute("text/plain", null);
        }
    }

    export class HttpResponseContext {
        constructor(readonly context: HttpRequestContext, readonly contentType: string, readonly payload: any) {
        }

        async asJson<T>() {
            const response = await this.context.execute(this.contentType, this.payload);
            const result = JSON.parse(response.response as string) as T;
            return result;
        }

        async go() {
            await this.context.execute(this.contentType, this.payload);
        }
    }

    export enum HttpStatusCode {
        Found = 200,
        NoContent = 204,
        BadRequest = 400,
        NotFound = 404,
        InternalServerError = 500,
        ServiceUnavailable = 503
    }

    export class HttpStatusCodeError extends Error {
        constructor(readonly statusCode: HttpStatusCode, message: string, response: any) {
            super(`${statusCode}: ${message}`);
        }
    }
}