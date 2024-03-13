import { useEffect, useState } from "react";
import { fetchData } from "./spotty";
const useData = (session) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getTracks = async () => {
      const data = await fetchData(session);
      setData(data);
    };

    if (session) {
      getTracks();
    }
  }, [session]);

  return data;
};

export default useData;
