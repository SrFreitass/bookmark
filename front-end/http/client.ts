import { refreshToken } from "./auth/refreshToken";

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

const client = async (method: HttpMethod, route: string, body?: unknown, contentType: string = 'application/json', header: Record<string, string> = {}, recursion: boolean = false) => {
  const runtime = useRuntimeConfig();
  const baseURL = runtime.public.baseUrlApi || "http://localhost:8080/api/v1";

  const tokens = getCookies();

  if(contentType === 'application/json') {
    header['Content-Type'] = contentType;
  }

  if(method === 'GET') {
    const res = await fetch(`${baseURL}${route}`, {
      headers: {
        ...header,
        authorization: `${tokens?.value?.token}`,
      },
      method,
    });

    return res.json();
  }

  const res = await fetch(`${baseURL}${route}`, {
    headers: {
      ...header,
       authorization: `${tokens?.value?.token}`,
    },
    method,
    body: contentType === 'application/json' ? JSON.stringify(body) : body as BodyInit,
  });


  const json = await res.json();

  if(json?.statusCode == 401 || json?.statusCode == 403) {
    if (recursion) return;

    await refreshToken();
    return await client(method, route, body, contentType, header, true);
  }

  return json;
};

export { client };
