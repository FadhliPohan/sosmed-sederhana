import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "", headers = {} } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });
  // console.log("header",headers);

  const fetchingData = useCallback(
    async ({ url = "", method = "GET", headers = {} } = {}) => {
      setData({ ...data, isLoading: true });
      try {
        const response = await fetch(url, { method, headers });
        const result = await response.json();
        setData({ ...data, data: result, isLoading: false });
      } catch (error) {
        setData({ ...data, isError: true, isLoading: false });
      }
    },
    []
  );

  const refetchData = useCallback(() => {
    fetchingData({ url: prefixUrl, headers: headers });
  }, [prefixUrl, headers, fetchingData]);

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl, headers: headers });
    }
  }, []);

  return { ...data, refetchData };
};
