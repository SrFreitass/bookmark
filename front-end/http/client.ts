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

const client = async (method: HttpMethod, route: string, body?: unknown) => {
  const runtime = useRuntimeConfig();
  const baseURL = runtime.public.baseUrlApi || "localhost:8080/api/v1";

  const { token, refreshToken } = useAuthorization();
  console.log(baseURL, route);
  const res = await fetch(`${baseURL}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });

  console.log(res);

  return await res.json();
};

export { client };
