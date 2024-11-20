import type { Tokens } from "~/middleware/admin";

const getCookies = () => {
  try {
    return useCookie<Tokens>('tokens');
  } catch(err) {
    return null;
  }
}

export { getCookies };
