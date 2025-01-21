import { useEffect, useState } from "react";
import "./App.css";
import { useFetch } from "./custom-hooks/useFetch";
import { useLocalStorage } from "./custom-hooks/useLocalStorage";
import { useDebounce } from "./custom-hooks/useDebounce";
import { useWindowSize } from "./custom-hooks/useWindowSize";
import { usePrevious } from "./custom-hooks/usePrevious";
import { useHover } from "./custom-hooks/useHover";
import { useOnClickOutside } from "./custom-hooks/useOnClickOutside";
import { useTimeout } from "./custom-hooks/useTimeout";
import { useIntersectionObserver } from "./custom-hooks/useIntersectionObserver";
import { useMediaQuery } from "./custom-hooks/useMediaQuery";

function App() {
  const { isError, isLoading, data } = useFetch("https://dummyjson.com/users");
  const { storage, setStorage } = useLocalStorage();
  const { text, setText } = useDebounce(2000);
  const windowSize = useWindowSize();
  const { previous, setPrevious } = usePrevious();
  const { isHovered, ref } = useHover();
  const { clickRef, clickedOutside } = useOnClickOutside();
  const [count, setCount] = useState(0);
  const { clear, reset } = useTimeout(() => setCount((prev) => prev + 1), 2000);
  const { isIntersecting, targetRef } = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleStorage = () => {
    setStorage(text);
  };

  console.log("previous", previous);

  const handlePrevious = () => {
    setPrevious("previous");
  };

  console.log("clicked outside", clickedOutside);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Handling Custom Hooks
      </h1>
      <br />
      <h3>Store Name in Local Storage</h3>
      <input
        className="input-box"
        type="text"
        placeholder="enter name"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="submit-button" onClick={() => handleStorage()}>
        Submit
      </button>

      <br />
      <p>Window Width: {windowSize.width}</p>
      <p>Window Height: {windowSize.height}</p>
      <br />
      <button onClick={() => handlePrevious()}>Store Previous</button>
      <br />
      <div
        ref={ref}
        className="card"
        style={{ cursor: isHovered ? "pointer" : "default" }}
      >
        <p>Card Text</p>
      </div>
      <br />
      <div ref={clickRef} className="card">
        <p>Clicked Text</p>
      </div>
      <br />
      <div>
        <h3>Count: {count}</h3>
        <button onClick={reset}>Reset Timer</button>
        <button onClick={clear}>Clear Timer</button>
      </div>
      <br />
      <div>
        <div style={{ height: "100vh" }}>
          <p>Scroll down to see the observed element</p>
        </div>
        <div
          ref={targetRef}
          style={{
            height: "200px",
            backgroundColor: isIntersecting ? "lightgreen" : "lightcoral",
            transition: "background-color 0.3s ease",
            textAlign: "center",
            lineHeight: "200px",
          }}
        >
          {isIntersecting ? "Element is in view" : "Element is out of view"}
        </div>
        <div style={{ height: "100vh" }} />
      </div>
      <br />
      <div
        style={{
          padding: "20px",
          backgroundColor: isLargeScreen
            ? "lightblue"
            : isSmallScreen
            ? "lightcoral"
            : "lightgreen",
        }}
      >
        {isLargeScreen && <p>Large screen: width ≥ 1024px</p>}
        {isSmallScreen && <p>Small screen: width ≤ 600px</p>}
        {!isLargeScreen && !isSmallScreen && <p>Medium screen</p>}
      </div>
    </div>
  );
}

export default App;
