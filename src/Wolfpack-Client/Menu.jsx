import Footer from "./Footer";
import ProfileAvatar from "./ProfileAvatar";

import { WolfpackContext } from "../js/contexts";

import { useContext, useEffect } from "react";

import { useSpring, animated as a } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = () => {
  const wolfpackContext = useContext(WolfpackContext);
  const [menuSpring, menuSpringApi] = useSpring(() => ({
    config: {
      mass: 1,
      tension: 90,
      damping: 200,
      friction: 20,
    },
    opacity: 0,
    scale: 0.8,
  }));

  useEffect(() => {
    if (wolfpackContext.loaded) {
      menuSpringApi.start({ opacity: 1, scale: 1 });
    }
  }, [wolfpackContext.loaded, menuSpringApi]);

  return (
    <>
      {wolfpackContext.loaded && (
        <a.div style={menuSpring} className="w-full h-full fixed">
          <button
            onClick={() => wolfpackContext.setSettingsOpen(true)}
            className="absolute bottom-8 p-4 m-2 w-16 h-16 bg-zinc-600/80 rounded-full text-2xl">
            <FontAwesomeIcon icon={"gear"} />
          </button>
          <ProfileAvatar />
          <Footer />
        </a.div>
      )}
    </>
  );
};

export default Menu;
