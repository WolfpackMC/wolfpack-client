import { CircularProgress } from "@mui/material";
import { useTransition, animated as a, useSpring } from "react-spring";

import { useState, useEffect, useContext } from "react";
import WolfpackLogo from "./WolfpackLogo";

import { WolfpackContext } from "../js/contexts";

const loadText = [
  "Loading...",
  "Reticulating splines...",
  "Getting adjustments... (not really)",
  "Adjusting settings... (not really)",
  "Contacting server... (not really)",
  "Connecting to server... (not really)",
  "Doing the things...",
  "🦊",
  "🐺",
  "This shouldn't take this long...",
];

const Load = () => {
  const [text, setText] = useState("Loading...");
  const [progress, setProgress] = useState(10);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const wolfpackContext = useContext(WolfpackContext);

  const textTransition = useTransition(text, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20 },
    config: { friction: 15 },
  });

  const [loadSpring, loadSpringApi] = useSpring(() => ({
    config: {
      mass: 1,
      tension: 90,
      damping: 200,
      friction: 20,
    },
    opacity: 1,
    scale: 1,
    onRest: () => setLoadingVisible(false),
  }));

  useEffect(() => {
    if (progress === 100) {
      setText("Awoo!");
      loadSpringApi.start({ opacity: 0, scale: 1.5 });
      wolfpackContext.setLoaded(true);
    }
  }, [progress, loadSpringApi, wolfpackContext]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(text);
      let randText = loadText[Math.floor(Math.random() * loadText.length)];
      while (text === randText) {
        console.log("found duplicate");
        randText = loadText[Math.floor(Math.random() * loadText.length)];
        break;
      }
      setText(randText);
    }, 2000);

    const checkIfReady = setInterval(() => {
      if (document.readyState === "complete") {
        console.log("we ready");
        clearInterval(checkIfReady);
        clearInterval(interval);
        setProgress(100);
      }
    }, 10);

    return () => {
      clearInterval(interval);
      clearInterval(checkIfReady);
    };
  }, [text]);

  return (
    <>
      {loadingVisible && (
        <a.div style={loadSpring} className="fixed w-screen h-screen">
          <div className="grid justify-center content-center h-full">
            <CircularProgress
              value={progress}
              variant="determinate"
              size={200}
              sx={{ color: "rgb(212,212,216)" }}
            />
            <div className="h-0 justify-center grid content-center bottom-24 relative">
              <div className="w-32 h-32 -top-8 relative">
                <WolfpackLogo />
              </div>
            </div>
            <div className="grid justify-center content-center text-center fixed top-32 w-full h-full">
              {textTransition((style, i) => (
                <a.span style={style} className="h-0">
                  {i}
                </a.span>
              ))}
            </div>
          </div>
        </a.div>
      )}
    </>
  );
};

export default Load;
