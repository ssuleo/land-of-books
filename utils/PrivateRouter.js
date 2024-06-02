import nookies from "nookies";

export const checkAuthAndRedirect = async (ctx) => {
    const { authToken } = nookies.get(ctx);
  
    if (!authToken) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }
    return {
      props: {}
    };
  };