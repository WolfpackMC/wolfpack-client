import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";

import { WolfpackContext } from "../js/contexts";

import { openExternal } from "../js/util";

const Footer = () => {
  const [randomShake, setRandomShake] = useState(false);
  const wolfpackContext = useContext(WolfpackContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      if (num1 === num2) {
        setRandomShake(true);
        setTimeout(() => {
          setRandomShake(false);
        }, 1000);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="absolute right-0 mx-2 bottom-6 opacity-40 hover:opacity-100 transition-opacity font-['Poppins'] text-md select-none">
      [ Made with{" "}
      <Icon icon={["fas", "heart"]} className={randomShake ? "fa-shake" : ""} />{" "}
      and <Icon icon={["fas", "paw"]} /> by{" "}
      <button
        onClick={() =>
          openExternal("https://github.com/kalkafox", wolfpackContext)
        }>
        Kalka
      </button>{" "}
      ]
    </div>
  );
};

export default Footer;
