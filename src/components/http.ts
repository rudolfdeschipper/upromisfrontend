

export interface HttpRequest<REQB> {
  path: string;
  method?: string;
  body?: REQB;
  accessToken?: string;
}
export interface HttpResponse<RESB> extends Response {
  parsedBody?: RESB;
}

export const http = <REQB, RESB>(webAPIUrl: string,
  config: HttpRequest<REQB>,
): Promise<HttpResponse<RESB>> => {

  var debug = true;

  return new Promise((resolve, reject) => {
    const request = new Request(`${webAPIUrl}${config.path}`, {
      method: config.method || 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });
    if (config.accessToken) {
      request.headers.set('authorization', `bearer ${config.accessToken}`);
    }
    let response: HttpResponse<RESB>;
    fetch(request)
      .then(res => {
        response = res;
        if ((res.headers.get('Content-Type') || '').indexOf('json') > 0) {
          if (debug) console.log("http: parsing json")
          return res.json();
        } else {
          if (debug) console.log("http: no json, resolving response")
          resolve(response);
        }
      })
      .then(body => {
        if (debug) console.log("http: body: " + JSON.stringify(body));
        if (response.ok) {
          if (debug) console.log("http: response ok, resolving")
          response.parsedBody = body;
          resolve(response);
        } else {
          if (debug) console.error("Non-ok received - rejecting:");
          if (debug) console.error(response);
          response.parsedBody = body;
          reject(response);
        }
      })
      .catch(err => {
        if (debug) console.log("http: exception, rejecting")
        if (debug) console.error(err);
        reject(err);
      });
  });
};