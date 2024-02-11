import Cookies from "js-cookie";
import { useCallback, useState } from "react";

export const useComment = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const comment = useCallback(
    async ({ method = "POST", idPost = "" } = {}) => {
      setData({ ...data, isLoading: true });
      console.log(idPost);
      var url =
        "https://paace-f178cafcae7b.nevacloud.io/api/replies/post/" + idPost;
      try {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
            // "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData({ ...data, data: result, isLoading: false });
        return { ...result };
      } catch (error) {
        console.log(error);
      }
    },
    [data]
  );
  // const uncomment = useCallback(
  //   async ({ method = "POST", idPost = "" } = {}) => {
  //     setData({ ...data, isLoading: true });
  //     console.log(idPost);
  //     var url =
  //       "https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/" + idPost;
  //     try {
  //       const response = await fetch(url, {
  //         method,
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("user_token")}`,
  //           // "Content-Type": "application/json",
  //         },
  //       });
  //       const result = await response.json();
  //       setData({ ...data, data: result, isLoading: false });
  //       return { ...result };
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [data]
  // );

  return { ...data, comment };
};
