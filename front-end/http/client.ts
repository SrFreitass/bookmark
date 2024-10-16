import { useAuthorization } from "~/composables/useAuthorization";

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

const client = async (method: HttpMethod, route: string, body?: unknown, contentType: string = 'application/json') => {
  const runtime = useRuntimeConfig();
  const baseURL = runtime.public.baseUrlApi || "localhost:8080/api/v1";
  
  const headers: Record<string, string> = {};

  if(contentType === 'application/json') { 
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${baseURL}${route}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${''}`,
    },
    method,
    body: contentType === 'application/json' ? JSON.stringify(body) : body as BodyInit,
  });


  return await res.json();
};

export { client };
