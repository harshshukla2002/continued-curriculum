import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem("username"))
  );

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(storage));
  }, [storage]);

  return { storage, setStorage };
};
