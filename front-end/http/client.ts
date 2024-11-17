import type { Tokens } from "~/middleware/admin";

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "CONNECT"
  | "TRACE";

const client = async (method: HttpMethod, route: string, body?: unknown, contentType: string = 'application/json', header: Record<string, string> = {}) => {
  const runtime = useRuntimeConfig();
  const baseURL = runtime.public.baseUrlApi || "http://localhost:8080/api/v1";
  
  const headers: Record<string, string> = {};
  const tokens = useCookie<Tokens>('tokens');

  if(contentType === 'application/json') { 
    header['Content-Type'] = contentType;
  }

  if(method === 'GET') {
    const res = await fetch(`${baseURL}${route}`, {
      headers: {
        ...header,
        authorization: `${tokens.value.token}`,
      },
      method,
    });  

    return res.json();
  }

  const res = await fetch(`${baseURL}${route}`, {
    headers: {
      ...header,
       authorization: `${tokens.value.token}`,
    },
    method,
    body: contentType === 'application/json' ? JSON.stringify(body) : body as BodyInit,
  });


  return await res.json();
};

export { client };
