import { removeCookie } from "../src/components/Token";


export const handleLogoutClick = (router) => {
  removeCookie("authToken");
  router.push("/");
};
