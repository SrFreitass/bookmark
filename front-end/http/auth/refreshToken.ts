import { getCookies } from "~/utils/getCookies";
import { client } from "../client";


const refreshToken = async (): Promise<void> => {
  try {
    const cookies = getCookies();

    const res = await client("POST", "/auth/refreshtoken", {
      token: cookies?.value?.token,
      refreshToken: cookies?.value?.refreshToken,
    });

    if (!res.success) return;


    useRegisterTokens(res.data.token, res.data.refreshToken, true);


  } catch(err) {
    console.error(err);
  }
}

export { refreshToken };
