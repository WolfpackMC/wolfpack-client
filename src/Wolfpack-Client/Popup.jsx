import { useContext, useEffect } from "react";

import { WolfpackContext } from "../js/contexts";

import { useSpring, animated as a, useTransition } from "react-spring";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Popup = () => {
  const { popUp, setPopUp } = useContext(WolfpackContext);

  const [popupSpring, popupSpringApi] = useSpring(() => ({
    config: {
      friction: 10,
      mass: 0.5,
    },
    opacity: 0,
    scale: 0.8,
  }));

  const popupTransition = useTransition(popUp, {
    from: { opacity: 0, y: 0, scale: 0.8 },
    enter: { opacity: 1, y: 0, scale: 1 },
    leave: {
      opacity: 0,
      y: 0,
      scale: 0.8,
    },
    config: { friction: 15 },
  });

  useEffect(() => {
    if (popUp.message !== "") {
      popupSpringApi.start({ opacity: 1, scale: 1 });
    }
  }, [popUp, popupSpringApi]);

  const popupHandler = (action) => {
    popupSpringApi.start({
      opacity: 0,
      scale: 0.8,
      config: {
        clamp: true,
      },
      onRest: () => setPopUp({ message: "" }),
    });
    action();
  };

  const types = {
    info: { name: "Info", icon: "info", color: "#0f0f0f" },
    success: { name: "Success", icon: "check", color: "#00ff00" },
    warning: {
      name: "Warning",
      icon: "exclamation-triangle",
      color: "#ffd700",
    },
    error: { name: "Error", icon: "times", color: "#ff0000" },
  };

  return (
    <>
      {popupTransition((style, i) => (
        <a.div
          className="w-[500px] h-[200px] p-2 absolute text-center m-auto right-0 left-0 bottom-0 top-0 bg-zinc-800 rounded-xl font-['Poppins']"
          style={{ ...style, ...popupSpring }}>
          {i.message && (
            <>
              <div className="min-w-40 relative text-center left-0 right-0 m-auto">
                <FontAwesomeIcon
                  className="text-4xl"
                  color={types[i.type].color}
                  icon={types[i.type].icon}
                />
                <ReactMarkdown>{i.message}</ReactMarkdown>
              </div>
              <div className="inline-block my-7">
                {i.visible &&
                  i.options.map((option) => (
                    <button
                      key={option.id}
                      className="bg-zinc-600 text-white text-center text-md font-bold py-2 px-4 mx-4 rounded-full inline"
                      onClick={() => {
                        popupHandler(option.action);
                      }}>
                      {option.text}
                    </button>
                  ))}
              </div>
            </>
          )}
        </a.div>
      ))}
    </>
  );
};

export default Popup;
