import { WolfpackContext } from "../js/contexts";
import { useContext, useEffect } from "react";

import { useSpring, animated as a } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Settings = () => {
  const wolfpackContext = useContext(WolfpackContext);

  const [settingsSpring, settingsSpringApi] = useSpring(() => ({
    config: {
      friction: 10,
      mass: 0.5,
    },
    opacity: 0,
    scale: 0.8,
  }));

  useEffect(() => {
    if (wolfpackContext.settingsOpen) {
      settingsSpringApi.start({ opacity: 1, scale: 1 });
    }
  }, [wolfpackContext, settingsSpringApi]);

  return (
    wolfpackContext.settingsOpen && (
      <a.div
        style={settingsSpring}
        className="fixed z-10 w-full h-full bg-neutral-900/20 backdrop-blur-lg rounded-2xl">
        <button
          className="absolute right-0 my-2 mx-8 text-4xl"
          onClick={() => {
            settingsSpringApi.start({
              opacity: 0,
              scale: 0.8,
              onRest: () => wolfpackContext.setSettingsOpen(false),
            });
          }}>
          <FontAwesomeIcon icon="circle-xmark" />
        </button>
      </a.div>
    )
  );
};

export default Settings;
