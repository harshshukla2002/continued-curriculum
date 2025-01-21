import { useEffect, useRef, useState } from "react";

export const useDebounce = (time = 2000) => {
  const timeRef = useRef();
  const [text, setText] = useState("");

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      console.log("text is", text);
    }, time);

    return () => clearTimeout(timeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return { text, setText };
};
