import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useFetch = (url, query = "") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (error) {
        setData([]);
        toast.error(error?.messege);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, url]);
  return { isLoading, data };
};

export default useFetch;
