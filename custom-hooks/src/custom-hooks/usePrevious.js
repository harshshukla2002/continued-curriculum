import { useState } from "react";

export const usePrevious = () => {
  const [previous, setPrevious] = useState();

  return { previous, setPrevious };
};
